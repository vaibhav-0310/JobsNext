import multer from "multer";
import axios from "axios";
import dotenv from "dotenv";
import tryMultiplePdfParsers from "../functions/agent.js";
import { setJobTitle } from "../store/jobStore.js";


dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"));
    }
  },
});

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

let pdf = "";

const pdfUpload = async (req, res) => {
  const uploadSingle = upload.single("resume");

  uploadSingle(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      if (err.code === "UNEXPECTED_FIELD") {
        return res.status(400).json({
          error: 'Unexpected field error. Expected field name: "resume"',
        });
      }
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          error: "File too large. Maximum size allowed is 10MB",
        });
      }
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Validate file size and type
    if (req.file.size === 0) {
      return res.status(400).json({ error: "Uploaded file is empty" });
    }

    if (req.file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ error: "File size exceeds 10MB limit" });
    }

    try {
      console.log(
        `Processing PDF file: ${req.file.originalname} (${req.file.size} bytes)`
      );

      const pdfBuffer = req.file.buffer;

      // Validate PDF header
      const pdfHeader = pdfBuffer.slice(0, 4).toString();
      if (!pdfHeader.startsWith("%PDF")) {
        return res.status(400).json({
          error:
            "Invalid PDF file. The file does not appear to be a valid PDF document.",
        });
      }

      // Try multiple parsing strategies
      const extractedText = await tryMultiplePdfParsers(pdfBuffer);

      if (!extractedText || extractedText.trim().length === 0) {
        return res.status(400).json({
          error:
            "No text content could be extracted from the PDF. The file might be image-based or corrupted.",
        });
      }

      pdf = extractedText;
      console.log(
        `Successfully extracted ${extractedText.length} characters from PDF`
      );

      res.json({
        message: "PDF uploaded and text extracted successfully.",
        textLength: extractedText.length,
        preview:
          extractedText.substring(0, 200) +
          (extractedText.length > 200 ? "..." : ""),
      });
    } catch (parseErr) {
      console.error("PDF parsing error:", parseErr);

      // Provide more specific error messages
      let errorMessage = "Failed to parse PDF: ";

      if (parseErr.message.includes("bad XRef entry")) {
        errorMessage +=
          "The PDF file appears to be corrupted or has invalid cross-reference entries. Please try with a different PDF file.";
      } else if (parseErr.message.includes("Invalid PDF structure")) {
        errorMessage +=
          "The PDF file structure is invalid. Please ensure the file is not corrupted.";
      } else if (parseErr.message.includes("Encrypted PDF")) {
        errorMessage +=
          "The PDF file is password-protected or encrypted. Please upload an unprotected PDF.";
      } else {
        errorMessage += `${parseErr.message}. This might be due to a corrupted file, unsupported PDF version, or password protection.`;
      }

      res.status(500).json({
        error: errorMessage,
        details:
          process.env.NODE_ENV === "development" ? parseErr.stack : undefined,
      });
    }
  });
};

const getPrediction = async (req, res) => {
  const query  = "Provide the best matching job title.";

  // Validate input
  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: "Query cannot be empty" });
  }

  if (!pdf || pdf.trim().length === 0) {
    return res.status(400).json({
      error: "No PDF content available. Please upload a PDF file first.",
    });
  }

  // Limit context size to prevent token overflow
  const maxContextLength = 8000;
  const context =
    pdf.length > maxContextLength
      ? pdf.substring(0, maxContextLength) + "\n[Content truncated...]"
      : pdf;

  try {
    console.log(
      `Processing query: "${query.substring(0, 100)}${
        query.length > 100 ? "..." : ""
      }"`
    );
    console.log(`Context length: ${context.length} characters`);

    // Try Claude first, then fallback to other models
    const models = [
      "openai/gpt-oss-120b:free",
      "deepseek/deepseek-r1-0528:free",
      "google/gemini-2.0-flash-exp:free",
    ];

    let response;
    let lastError;

    for (const model of models) {
      try {
        console.log(`Trying model: ${model}`);
        response = await axios.post(
          OPENROUTER_API_URL,
          {
            model: model,
            messages: [
              {
                role: "system",
                content: `You are a resume analysis assistant.

Task:
Analyze the provided resume content and determine the most suitable job title.

Response Rules:
- Respond with ONLY one or two words
- The output must be a job title relevant to the resume
- Do NOT include explanations, punctuation, or additional text`,
              },
              {
                role: "user",
                content: `Resume Content: ${context} Provide the best matching job title.`,
              },
            ],
            max_tokens: 1024,
            temperature: 0.3,
          },
          {
            headers: {
              Authorization: `Bearer ${OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
            },
            timeout: 30000, // 30 second timeout
          }
        );

        console.log(`Successfully got response from ${model}`);
        break; // Success, exit the loop
      } catch (modelError) {
        console.log(
          `Model ${model} failed:`,
          modelError.response?.data?.error || modelError.message
        );
        lastError = modelError;
        continue; // Try next model
      }
    }

    if (!response) {
      throw lastError || new Error("All models failed to respond");
    }

    if (!response.data || !response.data.choices || !response.data.choices[0]) {
      throw new Error("Invalid response format from AI service");
    }

    const answer = response.data.choices[0].message.content;

    if (!answer || answer.trim().length === 0) {
      return res.status(500).json({
        error: "AI service returned an empty response. Please try again.",
      });
    }

    console.log(`Successfully generated answer of ${answer.length} characters`);
    setJobTitle(answer);
    res.json({
      answer: answer.trim(),
      contextLength: context.length,
      queryLength: query.length,
    }).status(200);
  } catch (error) {
    console.error(
      "Error querying AI service:",
      error.response?.data || error.message
    );

    let errorMessage = "Failed to get response from AI service";

    if (error.code === "ECONNABORTED") {
      errorMessage = "Request timed out. Please try again.";
    } else if (error.response?.status === 401) {
      errorMessage =
        "AI service authentication failed. Please check API configuration.";
    } else if (error.response?.status === 429) {
      errorMessage =
        "Too many requests. Please wait a moment before trying again.";
    } else if (error.response?.status === 413) {
      errorMessage =
        "Request payload too large. Try with a shorter question or smaller document.";
    } else if (error.response?.data?.error) {
      errorMessage = `AI service error: ${error.response.data.error}`;
    }

    res.status(500).json({
      error: errorMessage,
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export { getPrediction, pdfUpload };
