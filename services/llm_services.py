import base64
import json
import os
from groq import Groq

# --------------------
# Setup AI Client
# --------------------
groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# --------------------
# Load Curriculum Config
# --------------------
def load_curriculum_config(config_path: str = "config.json") -> dict:
    """
    Load the CURRICULUM_CONFIG exported from config.js (as JSON).
    Expects a JSON file at the given path.
    Falls back to an empty dict if not found.
    """
    try:
        with open(config_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"[WARN] curriculum config not found at '{config_path}'. Using empty config.")
        return {}
    except json.JSONDecodeError as e:
        print(f"[ERROR] Failed to parse curriculum config: {e}")
        return {}


# --------------------
# Build compact context string from config
# --------------------
def build_curriculum_context(config: dict) -> str:
    """
    Convert CURRICULUM_CONFIG into a compact, readable context string
    for the LLM system prompt.

    Format:
      CLASS: Class1 (aliases: class 1, std 1, grade 1)
        SUBJECT: Math (keywords: math, maths, numeracy)
          - TOPIC: Addition [ID: C1-MATH-1] | Bloom: Remember, Apply
            Triggers: add, plus, sum, addition
            Objectives: understand place value, ...
    """
    lines = []
    for class_key, class_data in config.items():
        aliases = ", ".join(class_data.get("aliases", []))
        lines.append(f"\nCLASS: {class_key} (aliases: {aliases})")

        for subject_key, subject_data in class_data.get("subjects", {}).items():
            keywords = ", ".join(subject_data.get("keywords", []))
            display = subject_data.get("display", subject_key)
            lines.append(f"  SUBJECT: {display} [key={subject_key}] (keywords: {keywords})")

            for topic in subject_data.get("topics", []):
                triggers = ", ".join(topic.get("triggers", []))
                objectives = "; ".join(topic.get("learning_objectives", []))
                bloom = topic.get("bloom_level", "")
                worksheet_types = ", ".join(topic.get("worksheet_types", []))
                lines.append(
                    f"    - TOPIC: {topic['name']} [ID: {topic['id']}] | Bloom: {bloom}"
                )
                lines.append(f"      Triggers: {triggers}")
                lines.append(f"      Objectives: {objectives}")
                lines.append(f"      Worksheet types: {worksheet_types}")

    return "\n".join(lines)


# --------------------
# Build System Prompt
# --------------------
def build_system_prompt(curriculum_context: str) -> str:
    return f"""
You are the K-Faive Syllabus Ingestion Engine for Indian K-5 students.

Your job is to read a teacher's syllabus, diary entry, Week-Peek sheet, emails, or WhatsApp message
and intelligently map it to the correct class level, subject(s), and topic(s) from the
curriculum config below.

─────────────────────────────────────────────
CURRICULUM CONFIG (your knowledge base):
─────────────────────────────────────────────
{curriculum_context}
─────────────────────────────────────────────

INSTRUCTIONS:
1. DETECT CLASS LEVEL: Match text against class aliases (e.g. "LKG", "Class 3", "Std 2", "Grade 4").
2. DETECT SUBJECTS: Match subject labels and keywords in the text.
3. DETECT TOPICS: Match topic triggers and learning objectives. Be semantic — a trigger like
   "carry over" should match an "Addition" topic even if the word "addition" isn't present.
4. Return ALL matching topics across ALL subjects found in the input.
5. For each topic, assign a confidence score (0.0 – 1.0).
6. If confidence < 0.5, flag it with "needs_verification": true.

OUTPUT FORMAT — return ONLY valid JSON, no explanation, no markdown:
{{
  "class_level": "<class_key from config, e.g. Class3>",
  "class_label": "<human label, e.g. Class 3>",
  "topics_found": [
    {{
      "subject_key": "<subject key from config>",
      "subject_display": "<display name>",
      "topic_id": "<topic ID>",
      "topic_name": "<topic name>",
      "learning_objectives": ["..."],
      "bloom_level": "...",
      "worksheet_types": ["..."],
      "confidence": 0.95,
      "needs_verification": false
    }}
  ],
  "raw_notes": "<any ambiguities or notes about the mapping>"
}}

IMPORTANT RULES:
- Never invent topic IDs or topic names not present in the config.
- If nothing matches, return topics_found as an empty list and explain in raw_notes.
- LKG/UKG use "Literacy" for English and "Numeracy" for Math.
- "II Lang: Hindi" or "II Lang: Kannada" → map to the corresponding language subject.
- Discovery = EVS/Theme-based for KG classes.
""".strip()


# --------------------
# Clean & Format Text
# --------------------
def format_text(text: str) -> str:
    text = text.replace("**", "").replace("*", "")
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    return "\n".join(lines)


# --------------------
# Generate Preview
# --------------------
def generate_preview(text: str, max_lines: int = 6) -> str:
    return "\n".join(text.split("\n")[:max_lines])


# --------------------
# Step 1: Extract text from image via vision LLM
# --------------------
def extract_text_from_image(image_bytes: bytes) -> str:
    base64_image = base64.b64encode(image_bytes).decode("utf-8")

    response = groq_client.chat.completions.create(
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
                            "Extract all readable text from this school worksheet, diary, or syllabus image. "
                            "Preserve the structure (headings, subject labels, topics, bullet points). "
                            "Return ONLY the extracted text — no commentary."
                        ),
                    },
                ],
            }
        ],
        temperature=0,
    )

    return response.choices[0].message.content.strip()


# --------------------
# Step 2: Map extracted text → curriculum topics via LLM
# --------------------
def map_to_curriculum(extracted_text: str, config: dict) -> dict:
    """
    Given extracted text and the curriculum config, ask the LLM to
    intelligently map it to class + subject + topics.
    """
    curriculum_context = build_curriculum_context(config)
    system_prompt = build_system_prompt(curriculum_context)

    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": (
                    "Here is the teacher's input. Map it to the curriculum:\n\n"
                    f"{extracted_text}"
                ),
            },
        ],
        temperature=0,
        response_format={"type": "json_object"},
    )

    raw = response.choices[0].message.content.strip()
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {
            "class_level": None,
            "class_label": None,
            "topics_found": [],
            "raw_notes": f"Failed to parse LLM response: {raw}",
        }


# --------------------
# Main: Analyze image end-to-end
# --------------------
def analyze_image(image_bytes: bytes, config: dict | None = None) -> dict:
    """
    Full pipeline:
      1. Extract text from image via vision LLM
      2. Map text → curriculum using config + LLM
      3. Return structured result
    """
    if config is None:
        config = load_curriculum_config()

    extracted_text = extract_text_from_image(image_bytes)
    curriculum_mapping = map_to_curriculum(extracted_text, config)

    return {
        "text_content": extracted_text,
        "curriculum_mapping": curriculum_mapping,
        # Legacy field for backward compat with main.py
        "subject": (
            curriculum_mapping["topics_found"][0]["subject_display"]
            if curriculum_mapping.get("topics_found")
            else "General"
        ),
    }


# --------------------
# Analyze plain text (PDF / text file)
# --------------------
def analyze_text(text: str, config: dict | None = None) -> dict:
    """
    For PDF or text file inputs — skip vision step, go straight to curriculum mapping.
    """
    if config is None:
        config = load_curriculum_config()

    curriculum_mapping = map_to_curriculum(text, config)

    return {
        "text_content": text,
        "curriculum_mapping": curriculum_mapping,
        "subject": (
            curriculum_mapping["topics_found"][0]["subject_display"]
            if curriculum_mapping.get("topics_found")
            else "General"
        ),
    }

