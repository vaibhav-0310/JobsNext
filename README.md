# JobsNext - AI-Powered Job Matching Platform

A full-stack web application that analyzes resumes using AI to recommend suitable job titles and scrapes relevant job listings from Naukri.com.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Usage Flow](#usage-flow)
- [Dependencies](#dependencies)

---

## 🚀 Overview

JobsNext is an intelligent job search platform that combines AI-powered resume analysis with automated job scraping. Users upload their resume (PDF), the system analyzes it using OpenRouter AI models to determine the best matching job title, and then automatically scrapes relevant job listings from Naukri.com based on the predicted role.

---

## ✨ Features

- **AI Resume Analysis**: Utilizes OpenRouter AI (GPT, DeepSeek, Gemini) to analyze resumes and predict the most suitable job title
- **PDF Text Extraction**: Multiple parsing strategies to handle various PDF formats
- **Automated Job Scraping**: Uses Puppeteer to scrape job listings from Naukri.com
- **Intelligent Search**: Automatically searches for jobs based on AI-predicted job titles
- **Job Data Extraction**: Extracts comprehensive job details including:
  - Job title
  - Company name
  - Location
  - Experience requirements
  - Job posting URL
  - Company logo
- **Responsive Frontend**: React-based user interface with modern components
- **Error Handling**: Robust error handling with multiple fallback strategies

---

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Web Scraping**: Puppeteer
- **PDF Parsing**: pdf-parse
- **AI Integration**: OpenRouter API (GPT, DeepSeek, Gemini models)
- **File Upload**: Multer
- **HTTP Client**: Axios

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Styling**: Custom CSS

---

## 📁 Project Structure

```
JobsNext/
│
├── client/                          # Frontend React application
│   ├── public/                      # Static public assets
│   ├── src/
│   │   ├── assets/                  # Images, fonts, etc.
│   │   ├── components/              # Reusable React components
│   │   │   ├── Navbar.jsx          # Navigation bar component
│   │   │   ├── Footer.jsx          # Footer component
│   │   │   └── css/
│   │   │       └── Navbar.css      # Navbar styles
│   │   ├── pages/                   # Page components
│   │   │   └── Home/
│   │   │       ├── Home.jsx        # Home page container
│   │   │       ├── Hero.jsx        # Hero section
│   │   │       ├── Nav.jsx         # Home navigation
│   │   │       ├── Company.jsx     # Company section
│   │   │       ├── Jobs.jsx        # Jobs listing section
│   │   │       ├── NewsLetter.jsx  # Newsletter section
│   │   │       ├── components/
│   │   │       │   └── JobCard.jsx # Individual job card
│   │   │       └── css/
│   │   │           └── Home.css    # Home page styles
│   │   ├── App.jsx                 # Main application component
│   │   ├── App.css                 # Application styles
│   │   ├── main.jsx                # Application entry point
│   │   └── index.css               # Global styles
│   ├── index.html                   # HTML template
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── eslint.config.js            # ESLint configuration
│   └── README.md                    # Client documentation
│
├── server/                          # Backend Express application
│   ├── controllers/                 # Request handlers
│   │   ├── jobScarper.controllers.js    # Job scraping controller
│   │   └── Predict.controller.js        # AI prediction & PDF upload controller
│   ├── routes/                      # API route definitions
│   │   ├── jobScarper.routes.js         # Job scraping routes
│   │   └── predict.routes.js            # AI prediction routes
│   ├── functions/                   # Utility functions
│   │   ├── jobScarper.js               # Puppeteer scraping logic
│   │   └── agent.js                    # PDF parsing strategies
│   ├── store/                       # In-memory state management
│   │   └── jobstore.js                 # Job title storage
│   ├── schema/                      # Mongoose schemas (if any)
│   ├── server.js                    # Express server entry point
│   ├── package.json                 # Backend dependencies
│   ├── .env                         # Environment variables (gitignored)
│   ├── .env.example                # Environment variables template
│   └── .gitignore                   # Git ignore rules
│
└── README.md                        # Project documentation (this file)
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. **Health Check**
```http
GET /
```
**Description**: Verifies server is running

**Response**:
```json
"JobsNext running fine"
```

---

#### 2. **Upload PDF Resume**
```http
POST /api/predict/upload-pdf
```

**Description**: Uploads a PDF resume and extracts text content using multiple parsing strategies

**Request**:
- **Content-Type**: `multipart/form-data`
- **Body**: 
  - `pdf` (file): PDF file (max 10MB)

**Success Response** (200):
```json
{
  "message": "PDF uploaded and text extracted successfully.",
  "textLength": 5432,
  "preview": "First 200 characters of extracted text..."
}
```

**Error Responses**:
- `400 Bad Request`: Invalid file, missing file, or unsupported format
- `500 Internal Server Error`: PDF parsing failure

**Features**:
- Validates PDF header (`%PDF`)
- Multiple parsing strategies with fallbacks
- Extracts text from password-protected PDFs (if possible)
- File size limit: 10MB
- Accepts only PDF files

---

#### 3. **Get AI Job Title Prediction**
```http
POST /api/predict/predict
```

**Description**: Analyzes uploaded resume using AI models to predict the best matching job title

**Request**:
- **Content-Type**: `application/json`
- **Note**: PDF must be uploaded first using `/upload-pdf` endpoint

**Success Response** (200):
```json
{
  "answer": "Full Stack Developer",
  "contextLength": 5432,
  "queryLength": 40
}
```

**Error Responses**:
- `400 Bad Request`: No PDF uploaded, empty query
- `401 Unauthorized`: API key authentication failed
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: AI service error

**AI Models Used** (in order of preference):
1. OpenAI GPT-OSS-120B (free)
2. DeepSeek R1-0528 (free)
3. Google Gemini 2.0 Flash Exp (free)

**Response Processing**:
- Temperature: 0.3 (more deterministic)
- Max tokens: 1024
- Timeout: 30 seconds per model
- Fallback mechanism if one model fails

---

#### 4. **Scrape Naukri Jobs**
```http
GET /api/jobs/scrape-naukri
```

**Description**: Scrapes job listings from Naukri.com based on the AI-predicted job title

**Prerequisites**: 
- Must call `/api/predict/predict` endpoint first to set job title

**Success Response** (200):
```json
{
  "count": 25,
  "jobs": [
    {
      "title": "Senior Full Stack Developer",
      "company": "Tech Company Ltd",
      "location": "Bangalore/Bengaluru",
      "experience": "3-5 Yrs",
      "link": "https://www.naukri.com/job-listings/...",
      "logo": "https://img.naukimg.com/logo_images/..."
    },
    // ... more jobs
  ]
}
```

**Error Responses**:
- `500 Internal Server Error`: Scraping failed or no job title available

**Scraping Details**:
- Uses Puppeteer with Chrome browser
- Searches Naukri.com with AI-predicted job title
- Automatically scrolls page 8 times to load more jobs
- Extracts job cards with comprehensive details
- Filters out incomplete job listings
- Typical result: 20-50 jobs per query

**Browser Configuration**:
- Headless: No (visible browser)
- Viewport: Maximized window
- Network wait: `networkidle2` (waits for network to be idle)
- Timeout: 90 seconds

---

## ⚙️ Setup and Installation

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or cloud instance)
- Google Chrome browser (for Puppeteer scraping)
- OpenRouter API key

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd JobsNext
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Configure environment variables**
```bash
cd ../server
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/jobsnext
OPENROUTER_API_KEY=your_openrouter_api_key_here
NODE_ENV=development
```

5. **Update Chrome executable path** (if needed)

Edit [server/functions/jobScarper.js](server/functions/jobScarper.js#L14):
```javascript
executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"
```

6. **Start MongoDB** (if using local instance)
```bash
mongod
```

7. **Start the backend server**
```bash
cd server
npm start
```
Server will run on `http://localhost:5000`

8. **Start the frontend development server**
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173` (default Vite port)

---

## 🔐 Environment Variables

Create a `.env` file in the `server/` directory:

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | `5000` |
| `MONGO_URI` | MongoDB connection string | Yes | `mongodb://127.0.0.1:27017/jobsnext` |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI models | Yes | `sk-or-v1-...` |
| `NODE_ENV` | Environment mode | No | `development` or `production` |

### Getting OpenRouter API Key

1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up for an account
3. Navigate to API Keys section
4. Generate a new API key
5. Add it to your `.env` file

---

## 🔄 Usage Flow

### Complete User Journey

1. **User uploads resume PDF**
   ```
   POST /api/predict/upload-pdf
   ```
   - System validates and parses PDF
   - Extracts text content using multiple strategies
   - Stores extracted text in memory

2. **System analyzes resume**
   ```
   POST /api/predict/predict
   ```
   - Sends resume text to AI models
   - AI determines best matching job title
   - Stores predicted job title in memory

3. **System scrapes relevant jobs**
   ```
   GET /api/jobs/scrape-naukri
   ```
   - Retrieves predicted job title from memory
   - Launches Puppeteer browser
   - Navigates to Naukri.com with search query
   - Scrapes job listings
   - Returns structured job data

4. **User views job listings**
   - Frontend displays job cards
   - Shows company info, location, experience
   - Provides links to full job postings

---

## 📦 Dependencies

### Server Dependencies

```json
{
  "axios": "^1.13.2",           // HTTP client for API calls
  "cors": "^2.8.5",             // Cross-Origin Resource Sharing
  "dotenv": "^17.2.3",          // Environment variable management
  "express": "^5.2.1",          // Web framework
  "mongoose": "^9.1.1",         // MongoDB ODM
  "multer": "^2.0.2",           // File upload handling
  "nodemon": "^3.1.11",         // Development auto-reload
  "pdf-parse": "^2.4.5",        // PDF text extraction
  "pdf-parser": "^1.0.5",       // Alternative PDF parser
  "puppeteer": "^24.34.0"       // Headless browser automation
}
```

### Client Dependencies

```json
{
  "lucide-react": "^0.562.0",   // Icon library
  "react": "^19.2.0",           // UI library
  "react-dom": "^19.2.0",       // React DOM rendering
  "react-router": "^7.11.0",    // Routing library
  "react-router-dom": "^7.11.0" // DOM bindings for React Router
}
```

### Client Dev Dependencies

```json
{
  "@vitejs/plugin-react": "^5.1.1",    // Vite React plugin
  "eslint": "^9.39.1",                  // Code linting
  "eslint-plugin-react-hooks": "^7.0.1",
  "eslint-plugin-react-refresh": "^0.4.24",
  "vite": "^7.2.4"                      // Build tool
}
```

---

## 🏗️ Architecture Overview

### Backend Architecture

```
Client Request
     ↓
Express Server (server.js)
     ↓
Routes (jobScarper.routes.js, predict.routes.js)
     ↓
Controllers (jobScarper.controllers.js, Predict.controller.js)
     ↓
Functions (jobScarper.js, agent.js)
     ↓
External Services (OpenRouter AI, Naukri.com)
```

### Data Flow

```
PDF Upload → Text Extraction → AI Analysis → Job Title Prediction
                                                      ↓
                                            Job Title Storage
                                                      ↓
                                            Web Scraping
                                                      ↓
                                            Job Listings Response
```

### State Management

- **In-Memory Store**: Simple JavaScript module for storing job title
- **File**: [server/store/jobstore.js](server/store/jobstore.js)
- **Functions**:
  - `setJobTitle(title)`: Stores predicted job title
  - `getJobTitle()`: Retrieves current job title
  - `clearJobTitle()`: Resets job title

---

## 🚧 Known Limitations

1. **Browser Dependency**: Requires Chrome browser installed for Puppeteer
2. **Single User**: In-memory state limits to single concurrent user
3. **Rate Limiting**: OpenRouter API has rate limits on free tier
4. **PDF Support**: Some encrypted/image-based PDFs may not parse correctly
5. **Scraping Reliability**: Web scraping may break if Naukri.com changes their HTML structure

---

## 🔮 Future Enhancements

- [ ] User authentication and session management
- [ ] Database storage for scraped jobs
- [ ] Multiple job board integrations
- [ ] Advanced filtering and sorting options
- [ ] Job application tracking
- [ ] Email notifications for new job matches
- [ ] Resume builder and optimizer
- [ ] Interview preparation resources

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

For issues and questions, please open an issue on the repository.

---

**Last Updated**: February 16, 2026
