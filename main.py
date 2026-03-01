from fastapi import FastAPI
from fastapi import File, UploadFile
from PIL import Image
import io
import pytesseract


app = FastAPI(title="Worksheet AI MVP ingestion module")

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

# --------------------
# API routes
# --------------------

@app.get("/")
def root():
    return {"status": "FastAPI running 🚀"}

@app.get("/health")
def health():
    return {"health": "ok"}

@app.get("/hello")
def hello():
    return {"message": "Hello from Worksheet AI 👋"}

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    # 1. Read uploaded file
    contents = await file.read()

    # 2. Convert to image
    image = Image.open(io.BytesIO(contents))

    # 3. OCR
    extracted_text = pytesseract.image_to_string(image)

    # 4. Subject classification
    subject = classify_subject(extracted_text)

    # 5. Response
    return {
        "filename": file.filename,
        "subject": subject,
        "text_preview": extracted_text[:500]
    }

