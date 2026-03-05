from fastapi import FastAPI
from fastapi import File, UploadFile
from PIL import Image
import io
import pytesseract
from PyPDF2 import PdfReader

app = FastAPI(title="Worksheet KFaiveAI-tutor ingestion module")

# --------------------
# Helper functions
# --------------------
def classify_subject(text: str):
    text = text.lower()

    if any(word in text for word in ["solve", "add", "subtract", "multiply", "divide", "equation"]):
        return "Math"

    if any(word in text for word in ["read", "write", "story", "noun", "verb"]):
        return "English"

    if any(word in text for word in ["plant", "animal", "water", "earth", "food"]):
        return "EVS"

    return "Unknown"

def extract_text_from_image(contents: bytes) -> str:
    image = Image.open(io.BytesIO(contents))
    return pytesseract.image_to_string(image)

# --------------------
# API routes
# --------------------

@app.get("/")
def root():
    return {"status": "FastAPI for ingestion running 🚀"}

@app.get("/health")
def health():
    return {"health": "ok"}

@app.get("/hello")
def hello():
    return {"message": "Hello from Worksheet AI 👋"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # 1. Read uploaded file
    contents = await file.read()
    text_content = ""

    try:
        # ----------------------------
        # IMAGE
        # ----------------------------
        if file.content_type.startswith("image/"):
            text_content = extract_text_from_image(contents)

        # ----------------------------
        # PDF
        # ----------------------------
        elif file.content_type == "application/pdf":
            pdf_reader = PdfReader(io.BytesIO(contents))
            for page in pdf_reader.pages:
                text_content += page.extract_text() or ""

        # ----------------------------
        # TEXT FILE
        # ----------------------------
        elif file.content_type == "text/plain":
            text_content = contents.decode("utf-8")

        else:
            return {
                "error": f"Unsupported file type: {file.content_type}"
            }

    except Exception as e:
        return {"error": f"Failed to process file: {str(e)}"}

    # Subject classification
    subject = classify_subject(text_content)

    # Response
    return {
        "filename": file.filename,
        "subject": subject,
        "text_preview": text_content
    }

