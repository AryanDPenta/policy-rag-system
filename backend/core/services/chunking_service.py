import re


class ChunkingService:

    @staticmethod
    def chunk_text(text, max_length=500):
        paragraphs = re.split(r'\n+', text)

        chunks = []
        current = ""

        for para in paragraphs:
            if len(current) + len(para) < max_length:
                current += " " + para
            else:
                chunks.append(current.strip())
                current = para

        if current:
            chunks.append(current.strip())

        return chunks