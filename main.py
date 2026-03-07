from fastapi import FastAPI, File, UploadFile
import os
import io
from dotenv import load_dotenv
from PyPDF2 import PdfReader

load_dotenv()

from services.llm_services import (
    analyze_image,
    analyze_text,
    format_text,
    generate_preview,
    load_curriculum_config,
)

app = FastAPI(title="Worksheet KFaiveAI-tutor ingestion module")

# Load curriculum config once at startup
CURRICULUM_CONFIG = load_curriculum_config("config.json")


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
    result = {}

    try:
        # ----------------------------
        # IMAGE
        # ----------------------------
        if file.content_type.startswith("image/"):
            result = analyze_image(contents, config=CURRICULUM_CONFIG)

        # ----------------------------
        # PDF
        # ----------------------------
        elif file.content_type == "application/pdf":
            pdf_reader = PdfReader(io.BytesIO(contents))
            raw_text = ""
            for page in pdf_reader.pages:
                raw_text += page.extract_text() or ""
            result = analyze_text(raw_text, config=CURRICULUM_CONFIG)

        # ----------------------------
        # TEXT FILE
        # ----------------------------
        elif file.content_type == "text/plain":
            raw_text = contents.decode("utf-8")
            result = analyze_text(raw_text, config=CURRICULUM_CONFIG)

        else:
            return {"error": f"Unsupported file type: {file.content_type}"}

    except Exception as e:
        return {"error": f"Failed to process file: {str(e)}"}

    formatted_text = format_text(result.get("text_content", ""))
    preview_text = generate_preview(formatted_text)
    mapping = result.get("curriculum_mapping", {})

    topics = mapping.get("topics_found", [])
    confidences = [t.get("confidence", 0) for t in topics]
    overall_confidence = round(sum(confidences) / len(confidences), 2) if confidences else 0.0
    needs_verification = any(t.get("needs_verification", False) for t in topics)

    return {
        "file": file.filename,
        # --- Legacy fields (backward compat) ---
        "subject": result.get("subject", "General"),
        "text_preview": preview_text,
        "formatted_text": formatted_text,
        # --- New: full curriculum mapping ---
        "curriculum_mapping": {
            "class_level": mapping.get("class_level"),
            "class_label": mapping.get("class_label"),
            "topics_found": topics,
            "raw_notes": mapping.get("raw_notes", ""),
        },
    }



