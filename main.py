
from fastapi import FastAPI, File, UploadFile
import os
from dotenv import load_dotenv
import io
from PyPDF2 import PdfReader

load_dotenv()

from services.llm_services import analyze_image, format_text, generate_preview

app = FastAPI(title="Worksheet KFaiveAI-tutor ingestion module")


# --------------------
# API Routes
# --------------------
@app.get("/")
def root():
    return {"status": "FastAPI for ingestion running 🚀"}


@app.get("/health")
def health():
    return {"health": "ok"}


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    text_content = ""

    try:
        # ----------------------------
        # IMAGE
        # ----------------------------
        if file.content_type.startswith("image/"):
            result = analyze_image(contents)
            text_content = result["text_content"]
            subject = result["subject"]

        # ----------------------------
        # PDF
        # ----------------------------
        elif file.content_type == "application/pdf":
            pdf_reader = PdfReader(io.BytesIO(contents))
            for page in pdf_reader.pages:
                text_content += page.extract_text() or ""
            subject = "General"

        # ----------------------------
        # TEXT FILE
        # ----------------------------
        elif file.content_type == "text/plain":
            text_content = contents.decode("utf-8")
            subject = "General"

        else:
            return {
                "error": f"Unsupported file type: {file.content_type}"
            }

    except Exception as e:
        return {"error": f"Failed to process file: {str(e)}"}

    formatted_text = format_text(text_content)
    preview_text = generate_preview(formatted_text)

    return {
        "file": file.filename,
        "subject": subject,
        "text_preview": preview_text,
        "formatted_text": formatted_text
    }