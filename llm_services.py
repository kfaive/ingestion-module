import base64
import json
import os
import pytesseract
from PIL import Image
import io
from groq import Groq

# --------------------
# Setup AI Client
# --------------------
groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# --------------------
# Allowed Subjects
# --------------------
SUBJECTS = [
    "Math",
    "English",
    "EVS",
    "Science",
    "Social Studies",
    "Language",
    "Computer",
    "General"
]

# --------------------
# Clean & Format Text
# --------------------
def format_text(text: str) -> str:

    text = text.replace("**", "")
    text = text.replace("*", "")

    lines = [line.strip() for line in text.split("\n") if line.strip()]
    formatted = "\n".join(lines)

    return formatted


# --------------------
# Generate Preview
# --------------------
def generate_preview(text: str, max_lines: int = 6) -> str:

    lines = text.split("\n")
    preview_lines = lines[:max_lines]

    return "\n".join(preview_lines)


# --------------------
# Analyze Image using Groq
# --------------------
def analyze_image(image_bytes: bytes) -> dict:

    base64_image = base64.b64encode(image_bytes).decode("utf-8")

    vision_response = groq_client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",
                        },
                    },
                    {
                        "type": "text",
                        "text": (
                            "Extract all readable text from this school worksheet or syllabus image. "
                            "Return ONLY the clean extracted text."
                        ),
                    },
                ],
            }
        ],
        temperature=0,
    )

    extracted_text = vision_response.choices[0].message.content.strip()

    classify_response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a primary school academic classifier.\n"
                    "Classify the given worksheet text into EXACTLY ONE subject from this list:\n"
                    "Math, English, EVS, Science, Social Studies, Language, Computer, General.\n\n"
                    "Rules:\n"
                    "- Return ONLY valid JSON.\n"
                    "- No explanation.\n"
                    "- If unsure, return \"General\".\n\n"
                    "Output strictly:\n"
                    "{\"subject\": \"Math\"}"
                ),
            },
            {"role": "user", "content": extracted_text},
        ],
        temperature=0,
        response_format={"type": "json_object"},
    )

    subject_json = json.loads(classify_response.choices[0].message.content)
    predicted_subject = subject_json.get("subject", "General")

    if predicted_subject not in SUBJECTS:
        predicted_subject = "General"

    return {
        "subject": predicted_subject,
        "text_content": extracted_text
    }