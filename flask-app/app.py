from flask import Flask, request, jsonify, send_file
from pymongo import MongoClient
import gridfs
import tempfile
import os
import random
import string
import bson
from pdfminer.high_level import extract_text
from langchain_openai import ChatOpenAI  # Updated import
from dotenv import load_dotenv
import traceback
import re
import json
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics

# Load environment variables from .env file and override existing ones
load_dotenv(override=True)
api_key = os.getenv('OPENAI_API_KEY')

# Flask app setup
app = Flask(__name__)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017")
db = client['hrmDatabase']
fs = gridfs.GridFS(db)

# Define page layout constants
TOP_MARGIN = 50
BOTTOM_MARGIN = 50

def draw_text_wrapped_paginated(c, text, y_position, max_width, line_height=15, height=letter[1], max_pages=2):
    """Helper function to draw wrapped text within max_width with pagination, respecting top and bottom margins."""
    page_count = 1
    words = text.split()
    line = ""
    for word in words:
        test_line = line + word + " "
        test_width = pdfmetrics.stringWidth(test_line, "Helvetica", 12)
        if test_width > max_width:
            c.drawString(72, y_position, line)
            y_position -= line_height
            line = word + " "
            if y_position < BOTTOM_MARGIN:  # Start new page if near bottom
                if page_count >= max_pages:
                    return False, y_position  # Stop if max pages reached
                c.showPage()
                c.setFont("Helvetica", 12)
                y_position = height - TOP_MARGIN  # Reset to top of new page
                page_count += 1
        else:
            line = test_line
    if line:
        c.drawString(72, y_position, line)
        y_position -= line_height
    return True, y_position

def create_pdf_from_json(json_resume, unique_id):
    """Generate a redacted PDF from JSON data with a maximum of two pages."""
    redacted_pdf_path = f"redacted_resume_{unique_id}.pdf"
    c = canvas.Canvas(redacted_pdf_path, pagesize=letter)
    width, height = letter

    # Header with Candidate ID
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(width / 2.0, height - TOP_MARGIN, f"Candidate {unique_id}")

    # Start writing resume sections from JSON
    y_position = height - TOP_MARGIN - 30  # Start below the header
    c.setFont("Helvetica", 12)  # Use standard readable font size

    def add_section(title, data):
        """Helper function to add a section to the PDF with pagination."""
        nonlocal y_position
        success, y_position = draw_text_wrapped_paginated(c, title, y_position, width - 144)
        if not success:
            return False
        for item in data:
            for key, value in item.items():
                if isinstance(value, list):  # Handle lists like responsibilities
                    success, y_position = draw_text_wrapped_paginated(c, f"{key.capitalize()}:", y_position, width - 144)
                    if not success:
                        return False
                    for sub_item in value:
                        success, y_position = draw_text_wrapped_paginated(c, f" - {sub_item}", y_position, width - 144)
                        if not success:
                            return False
                elif value:
                    success, y_position = draw_text_wrapped_paginated(c, f"{key.capitalize()}: {value}", y_position, width - 144)
                    if not success:
                        return False
            y_position -= 5  # Add small space between items
        return True

    # Adding each section of the JSON data
    if 'contact' in json_resume:
        success, y_position = draw_text_wrapped_paginated(c, "Contact:", y_position, width - 144)
        if not success:
            c.save()
            return redacted_pdf_path
        for key, value in json_resume['contact'].items():
            if value:
                success, y_position = draw_text_wrapped_paginated(c, f"{key.capitalize()}: {value}", y_position, width - 144)
                if not success:
                    c.save()
                    return redacted_pdf_path

    if 'education' in json_resume:
        y_position -= 10
        if not add_section("Education:", json_resume['education']):
            c.save()
            return redacted_pdf_path

    if 'experience' in json_resume:
        y_position -= 10
        if not add_section("Experience:", json_resume['experience']):
            c.save()
            return redacted_pdf_path

    if 'projects' in json_resume:
        y_position -= 10
        if not add_section("Projects:", json_resume['projects']):
            c.save()
            return redacted_pdf_path

    if 'technical_skills' in json_resume:
        y_position -= 10
        success, y_position = draw_text_wrapped_paginated(c, "Technical Skills:", y_position, width - 144)
        if not success:
            c.save()
            return redacted_pdf_path
        for skill_type, skills in json_resume['technical_skills'].items():
            if skills:
                success, y_position = draw_text_wrapped_paginated(c, f"{skill_type.capitalize()}: {', '.join(skills)}", y_position, width - 144)
                if not success:
                    c.save()
                    return redacted_pdf_path

    c.save()
    return redacted_pdf_path

# Helper functions
def generate_unique_id():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

def process_resume_with_llm(resume_text, unique_id):
    # Initialize the LLM with OpenAI API using ChatOpenAI for chat-based model
    llm = ChatOpenAI(api_key=api_key, model="gpt-3.5-turbo", temperature=0.7)

    # Define a prompt for redacting and structuring into JSON format
    prompt = f"""
    You are a professional resume assistant. Take the following resume text and:
    1. Replace the candidate’s name with a unique identifier (e.g., Candidate {unique_id}).
    2. Remove any personal contact details like phone numbers, email addresses, and social media links (including LinkedIn or GitHub URLs).
    3. Retain company names in work experience while neutralizing culturally specific mentions in clubs or organizations.
       Replace mentions of ethnic or religious clubs with neutral terms like "Community Organization" or "Student Society" but keep the candidate's role intact.
    4. Ignore and do not include URLs or any social media profile links in the output.
    5. Redact all author names in the publications section.
    6. Organize the resume content into the following JSON format:

    {{
      "name": "Candidate {unique_id}",
      "contact": {{
        "phone": "",
        "email": "",
        "linkedin": "",
        "github": ""
      }},
      "education": [
        {{
          "institution": "",
          "location": "",
          "degree": "",
          "dates": ""
        }}
      ],
      "experience": [
        {{
          "title": "",
          "dates": "",
          "company": "",
          "location": "",
          "responsibilities": [
            ""
          ]
        }}
      ],
      "projects": [
        {{
          "name": "",
          "technologies": [""],
          "dates": "",
          "details": [
            ""
          ]
        }}
      ],
      "technical_skills": {{
        "languages": [""],
        "frameworks": [""],
        "developer_tools": [""],
        "libraries": [""]
      }}
    }}

    Here is the resume text:
    {resume_text}

    Provide only the JSON formatted output as a result.
    """

    # Use the chat format with messages
    messages = [{"role": "user", "content": prompt}]
    
    # Pass the messages to llm.invoke(), which expects a list of messages for chat models
    response = llm.invoke(messages)

    # Convert response content to JSON
    try:
        json_data = json.loads(response.content)
    except json.JSONDecodeError:
        print("Error: Failed to parse JSON from LLM response.")
        return None

    return json_data

@app.route('/api/resume/upload', methods=['POST'])
def upload_resume():
    if 'resume' not in request.files:
        return jsonify({'error': 'No resume uploaded'}), 400

    resume = request.files['resume']
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        resume.save(temp_file.name)
        temp_file_path = temp_file.name

    try:
        extracted_text = extract_text(temp_file_path)
        unique_id = generate_unique_id()
        json_resume = process_resume_with_llm(extracted_text, unique_id)
        
        if json_resume is None:
            return jsonify({'error': 'Failed to parse resume to JSON format'}), 500

        # Generate the redacted PDF locally
        redacted_pdf_path = create_pdf_from_json(json_resume, unique_id)
        
        # Insert JSON into MongoDB (optional)
        resume_id = fs.put(json.dumps(json_resume).encode('utf-8'), filename=f"resume_{unique_id}.json")

        os.remove(temp_file_path)

        return jsonify({
            'message': 'Resume uploaded and processed successfully',
            'json_resume': json_resume,
            'unique_id': unique_id,
            'resume_id': str(resume_id),
            'pdf_path': redacted_pdf_path  # Return path of saved PDF for reference
        }), 200

    except Exception as e:
        os.remove(temp_file_path)
        print(f"Exception occurred: {e}")
        traceback.print_exc()
        return jsonify({'error': 'Failed to process the resume', 'details': str(e)}), 500

if __name__ == '__main__':
    print(f"Loaded OpenAI API Key: {api_key}")
    app.run(port=5001, debug=True)
