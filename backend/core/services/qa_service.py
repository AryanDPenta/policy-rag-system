import os
from groq import Groq
from core.services.retrieval_service import RetrievalService

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise Exception("GROQ_API_KEY not found")

client = Groq(api_key=api_key)


class QAService:

    @staticmethod
    def answer_query(query):

        chunks = RetrievalService.retrieve_chunks(query)

        if not chunks:
            return "No relevant information found in policies."

        context = "\n".join([c["text"] for c in chunks])

        prompt = f"""
You are a company policy assistant.

STRICT RULES:
- Answer ONLY from the given context
- If answer is not present, say: "Not mentioned in policies"

Context:
{context}

Question:
{query}
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2
        )

        return response.choices[0].message.content.strip()