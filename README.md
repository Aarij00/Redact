# Redact - Anonymous Job Application Platform

![Status](https://img.shields.io/badge/Status-Work%20In%20Progress-yellow)
![Development](https://img.shields.io/badge/Development-Active-success)

![CI](https://img.shields.io/badge/CI-no%20status-lightgrey)
![Website](https://img.shields.io/badge/website-down-red)
![Pull Requests](https://img.shields.io/badge/pull%20requests-0%20open-brightgreen)
![Commits](https://img.shields.io/badge/commits-64-blue)
![Contributors](https://img.shields.io/badge/contributors-1-blue)
![License](https://img.shields.io/badge/license-MIT-green)

> 🚧 **Note:** This project is currently under active development. Features and documentation may not be final.

Redact is a modern web application designed to eliminate hiring bias by automatically redacting personally identifiable and potentially discriminatory information from job applications. Using advanced AI technology, it creates standardized, bias-free resumes while preserving candidates' relevant skills and experiences.

## ✨ Features

- **AI-Powered Resume Processing**: 
  - Utilizes LangChain and OpenAI API to intelligently process and redact resumes
  - Automatically removes age, gender, ethnicity, and other potentially discriminatory information
  - Preserves and highlights relevant skills, experience, and achievements
  - Standardizes resume format for fair comparison

- **Professional Profile Integration**:
  - Optional GitHub and LinkedIn profile integration
  - AI analyzes public repositories and contributions from GitHub
  - Extracts relevant professional experience from LinkedIn
  - Combines multiple data sources to create a comprehensive, bias-free profile

- **Anonymous Applications**: 
  - Automatically redacts personal information from resumes
  - Creates standardized application formats for fair evaluation
  - Ensures hiring decisions are based purely on merit and qualifications

- **Secure Email Forwarding**: 
  - Uses AnonAddy for anonymous email communication
  - Maintains candidate privacy throughout the hiring process

- **HR Management Dashboard**: 
  - Complete toolkit for HR managers to post and manage job listings
  - Bias-free candidate evaluation tools
  - Standardized comparison metrics

- **Candidate Tracking**: 
  - Tools for shortlisting and managing candidate applications
  - Maintains anonymity throughout the selection process

## 🛠️ Tech Stack

### Main Backend (Node.js)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

### AI Microservice (Flask)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![LangChain](https://img.shields.io/badge/🦜️_LangChain-2C974B?style=for-the-badge)
![Selenium](https://img.shields.io/badge/Selenium-43B02A?style=for-the-badge&logo=Selenium&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

## 📋 Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- MongoDB
- AnonAddy API key
- OpenAI API key
- Chrome/Firefox WebDriver (for Selenium features)

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/redact.git
cd redact
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up Flask microservice:
```bash
cd ../flask-app
pip install -r requirements.txt
```

5. Configure environment variables:
Create a `.env` file in the backend directory with the following variables:
```
DB_URI=your_mongodb_uri
PORT=3001
JWT_SECRET=your_jwt_secret
ANONADDY_API_KEY=your_anonaddy_api_key
OPENAI_API_KEY=your_openai_api_key
```

## 🏃��♂️ Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

3. Start the Flask microservice:
```bash
cd flask-app
python app.py
```

The application will be available at `http://localhost:3000`

## ⚙️ How It Works

1. **Resume Submission**:
   - Candidates submit their resume and optionally provide GitHub/LinkedIn profiles
   - System processes the PDF resume and scrapes provided professional profiles

2. **AI Processing**:
   - LangChain orchestrates the processing pipeline
   - OpenAI analyzes the content and identifies potentially biasing information
   - Creates a standardized, bias-free version of the resume
   - Extracts and incorporates relevant information from GitHub/LinkedIn profiles

3. **Anonymization**:
   - Generates anonymous email aliases for communication
   - Creates unique candidate IDs for tracking
   - Stores original information securely for later stages

4. **HR Review**:
   - HR managers receive standardized, bias-free applications
   - All candidates are evaluated purely on merit and qualifications
   - Communication maintains anonymity through secure channels

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- LangChain for AI orchestration
- AnonAddy for email anonymization services
- MongoDB Atlas for database hosting