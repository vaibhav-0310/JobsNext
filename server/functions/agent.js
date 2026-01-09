import {PDFParse} from "pdf-parse";

// Function to try multiple PDF parsing strategies
const tryMultiplePdfParsers = async (pdfBuffer) => {
  // Convert Buffer to Uint8Array as required by pdf-parse
  const uint8Array = new Uint8Array(pdfBuffer);
  
  const strategies = [
    async () => {
      console.log("Trying standard pdf-parse...");
      const pdfParse = new PDFParse(uint8Array);
      const data = await pdfParse.getText();
      return data.text;
    },
    async () => {
      console.log("Trying pdf-parse with max pages option...");
      const pdfParse = new PDFParse(uint8Array, {
        max: 0, // Parse all pages
      });
      const data = await pdfParse.getText();
      return data.text;
    },
    async () => {
      console.log("Trying pdf-parse with custom page render...");
      const pdfParse = new PDFParse(uint8Array, {
        max: 0,
        pagerender: async (pageData) => {
          try {
            const textContent = await pageData.getTextContent();
            let lastY, text = "";
            for (let item of textContent.items) {
              if (lastY == item.transform[5] || !lastY) {
                text += item.str;
              } else {
                text += "\n" + item.str;
              }
              lastY = item.transform[5];
            }
            return text;
          } catch (error) {
            return pageData
              .getTextContent()
              .then((content) =>
                content.items.map((item) => item.str).join(" ")
              );
          }
        },
      });
      const data = await pdfParse.getText();
      return data.text;
    },
  ];

  let lastError;
  let extractedText = "";

  for (let i = 0; i < strategies.length; i++) {
    try {
      const result = await strategies[i]();
      if (result && result.trim().length > 0) {
        console.log(`Successfully parsed PDF with strategy ${i + 1}`);
        extractedText = result;
        break;
      }
    } catch (error) {
      console.log(`Strategy ${i + 1} failed:`, error.message);
      lastError = error;
      if (i === strategies.length - 1) {
        throw lastError;
      }
    }
  }

  if (!extractedText || extractedText.trim().length === 0) {
    throw lastError || new Error("All PDF parsing strategies failed");
  }

  return extractedText;
};

export default tryMultiplePdfParsers;