from core.services.chunking_service import ChunkingService
from core.services.embedding_service import EmbeddingService
from core.repositories.chunk_repository import ChunkRepository


class RAGService:

    @staticmethod
    def process_document(doc, text):
        print("🔥 Processing document")

        chunks = ChunkingService.chunk_text(text)

        print(f"📦 Chunks created: {len(chunks)}")

        for chunk in chunks:
            embedding = EmbeddingService.generate_embedding(chunk)

            ChunkRepository.create_chunk(
                document=doc,
                text=chunk,
                embedding=embedding
            )