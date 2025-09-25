import os
import io
import json
import zipfile
from typing import Literal

# --- FLASK IMPORTS ---
# Flask is the web framework.
# request handles incoming data (files, forms).
# abort is for error handling.
# send_file sends files as responses.
from flask import Flask, request, abort, send_file
# Flask-Cors handles Cross-Origin Resource Sharing.
from flask_cors import CORS

# --- UNCHANGED IMPORTS ---
import fitz  # PyMuPDF
import docx
import google.generativeai as genai
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch

# --- CONFIGURATION ---
# Ensure you have your API key set correctly.
GEMINI_API_KEY = "AIzaSyDmT9BKStR_-Iq0VIXbNSKo1_zm6ucztIA"  # Your key is placed here
if "YOUR_GEMINI_API_KEY" in GEMINI_API_KEY:
    raise ValueError("Please replace the placeholder with your actual Gemini API key.")
genai.configure(api_key=GEMINI_API_KEY)


# --- FLASK APP INITIALIZATION ---
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # Limit uploads to 16 MB

# --- CORS SETUP ---
# This allows your frontend to communicate with the backend.
# "*" allows all origins for simplicity in development.
CORS(app)


# --- HELPER FUNCTIONS (Adapted for Flask) ---

def extract_text_from_file(file) -> str:
    """
    Extracts text content from an uploaded PDF or DOCX file.
    Note: The 'file' parameter is now a Werkzeug FileStorage object from Flask.
    """
    filename = file.filename
    extension = filename.split(".")[-1].lower()
    content = ""
    try:
        if extension == "pdf":
            # file.read() gets the bytes from the FileStorage object
            pdf_bytes = file.read()
            with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:
                for page in doc:
                    content += page.get_text()
        elif extension == "docx":
            # The docx library can read directly from the file stream
            doc = docx.Document(file.stream)
            for para in doc.paragraphs:
                content += para.text + "\n"
        else:
            # Using Flask's abort() for error responses
            abort(400, description="Unsupported file type. Please upload a PDF or DOCX file.")
        return content
    except Exception as e:
        abort(500, description=f"Failed to process file: {str(e)}")

def generate_questions_from_text(text: str, num_questions: int) -> dict:
    """
    Uses the Gemini AI model to generate a specified number of questions.
    (This function's core logic is unchanged, but HTTPException is replaced with abort)
    """
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    per_section = num_questions // 3
    
    prompt = f"""
    Based on the following text, please generate a quiz for students. The quiz must contain exactly {num_questions} questions in total.
    The questions should be divided as evenly as possible into three sections:
    1. '{per_section}' 'Fill in the Blank' questions.
    2. '{per_section}' 'Multiple Choice' questions, each with 4 options (A, B, C, D).
    3. The remaining questions should be 'Short Answer' questions that require a brief explanation.

    Please provide the output in a single valid JSON object. The JSON object must have two main keys: "worksheet" and "answer_key".
    - The "worksheet" value should be a list of question objects.
    - The "answer_key" value should be a list of answer objects.
    
    Example structure:
    {{
      "worksheet": [
        {{ "type": "fill_in_blank", "question": "The capital of France is ____." }},
        {{ "type": "multiple_choice", "question": "What is 2+2?", "options": {{"A": "3", "B": "4", "C": "5", "D": "6"}} }}
      ],
      "answer_key": [
        {{ "question_number": 1, "answer": "Paris" }},
        {{ "question_number": 2, "answer": "B: 4" }}
      ]
    }}

    Here is the text to analyze:
    ---
    {text[:8000]}
    ---
    """

    try:
        response = model.generate_content(prompt)
        cleaned_response = response.text.strip().replace("```json", "").replace("```", "")
        
        print("--- RAW AI RESPONSE ---")
        print(cleaned_response)
        print("-----------------------")

        return json.loads(cleaned_response)
    except json.JSONDecodeError as e:
        print(f"JSON Parsing Error: {e}")
        error_detail = "The AI model returned a response that was not in valid JSON format. Check the terminal logs for the raw output."
        abort(500, description=error_detail)
    except Exception as e:
        print(f"An unexpected AI Generation Error occurred: {e}")
        abort(500, description="An unexpected error occurred while generating questions.")

def create_pdf(title: str, content: list) -> io.BytesIO:
    """
    Creates a PDF document from a list of questions or answers.
    (This function is pure Python and remains unchanged)
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, topMargin=inch, bottomMargin=inch)
    styles = getSampleStyleSheet()
    story = [Paragraph(title, styles['h1']), Spacer(1, 0.25 * inch)]

    question_number = 1
    current_section = ""

    for item in content:
        section_title = item.get("type", "").replace("_", " ").title()
        if section_title and section_title != current_section:
            current_section = section_title
            story.append(Spacer(1, 0.2 * inch))
            story.append(Paragraph(current_section, styles['h2']))
            story.append(Spacer(1, 0.1 * inch))

        if "question" in item:
            q_text = f"{question_number}. {item['question']}"
            story.append(Paragraph(q_text, styles['BodyText']))
            if "options" in item and isinstance(item.get('options'), dict):
                for key, value in item['options'].items():
                    opt_text = f"&nbsp;&nbsp;&nbsp;&nbsp;{key}: {value}"
                    story.append(Paragraph(opt_text, styles['BodyText']))
            story.append(Spacer(1, 0.1 * inch))
            question_number += 1

        elif "answer" in item:
            ans_text = f"{item.get('question_number', question_number)}. {item.get('answer', 'N/A')}"
            story.append(Paragraph(ans_text, styles['BodyText']))
            story.append(Spacer(1, 0.1 * inch))

    doc.build(story)
    buffer.seek(0)
    return buffer

# --- API ENDPOINT (Flask version) ---

@app.route("/generate-worksheet", methods=["POST"])
def generate_worksheet_endpoint():
    """
    Accepts a file and number of questions, generates a worksheet and
    answer key, and returns them in a single ZIP file.
    """
    # --- Retrieving file and form data from the 'request' object ---
    if 'file' not in request.files:
        abort(400, description="No file part in the request.")
    
    file = request.files['file']
    if file.filename == '':
        abort(400, description="No selected file.")
    
    # Get 'num_questions' from form data, with a default and type conversion.
    num_questions = request.form.get('num_questions', default=30, type=int)

    if not 3 <= num_questions <= 100:
        abort(400, description="Number of questions must be between 3 and 100.")

    print(f"Processing file: {file.filename} for {num_questions} questions.")
    document_text = extract_text_from_file(file)
    if not document_text.strip():
        abort(400, description="The uploaded document appears to be empty or contains no readable text.")

    print("Generating questions with AI...")
    qa_data = generate_questions_from_text(document_text, num_questions)

    print("Creating PDF documents...")
    worksheet_pdf_buffer = create_pdf(f"Student Worksheet ({num_questions} Questions)", qa_data.get("worksheet", []))
    answer_key_pdf_buffer = create_pdf("Answer Key", qa_data.get("answer_key", []))

    print("Zipping files for response...")
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
        zip_file.writestr("worksheet.pdf", worksheet_pdf_buffer.getvalue())
        zip_file.writestr("answer_key.pdf", answer_key_pdf_buffer.getvalue())
    zip_buffer.seek(0)

    # --- Use Flask's 'send_file' to return the in-memory zip file ---
    return send_file(
        zip_buffer,
        mimetype="application/zip",
        as_attachment=True,
        download_name="worksheet_and_answers.zip"
    )

# --- RUN THE SERVER ---
if __name__ == "__main__":
    # Use app.run() for Flask development server.
    # For production, you would use a WSGI server like Gunicorn or uWSGI.
    app.run(host="0.0.0.0", port=8000, debug=True)