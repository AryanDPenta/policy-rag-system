import pdfplumber
import pytesseract
from PIL import Image
import re


class ContentExtractionService:

    @staticmethod
    def extract_text(file_path):
        text = ""

        try:
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    extracted = page.extract_text()
                    if extracted:
                        text += extracted + "\n"

            # OCR fallback
            if len(text.strip()) < 50:
                print("⚠️ Using OCR fallback")

                with pdfplumber.open(file_path) as pdf:
                    for page in pdf.pages:
                        img = page.to_image().original
                        ocr_text = pytesseract.image_to_string(img)
                        text += ocr_text + "\n"

        except Exception as e:
            print("❌ Extraction error:", str(e))

        return ContentExtractionService.clean_text(text)

    @staticmethod
    def clean_text(text):
        text = text.encode("utf-8", "ignore").decode("utf-8")
        text = re.sub(r'[^\x00-\x7F]+', ' ', text)
        return text.strip()