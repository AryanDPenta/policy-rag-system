import numpy as np
from apps.policies.models import PolicyChunk
from core.services.embedding_service import EmbeddingService


class RetrievalService:

    @staticmethod
    def cosine_similarity(vec1, vec2):
        v1 = np.array(vec1)
        v2 = np.array(vec2)

        if np.linalg.norm(v1) == 0 or np.linalg.norm(v2) == 0:
            return 0

        return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

    @staticmethod
    def retrieve_chunks(query, top_k=5):
        print("🔍 Retrieving chunks...")

        query_embedding = EmbeddingService.generate_embedding(query)

        chunks = PolicyChunk.objects.all()

        if not chunks.exists():
            print("❌ No chunks in DB")
            return []

        scored = []

        for chunk in chunks:
            score = RetrievalService.cosine_similarity(
                query_embedding,
                chunk.embedding
            )

            # 🔥 FILTER LOW-QUALITY MATCHES HERE
            if score > 0.3:
                scored.append((score, chunk))

        scored.sort(reverse=True, key=lambda x: x[0])

        seen_docs = set()
        top_chunks = []

        for score, chunk in scored:
            doc_name = chunk.document.name

            if doc_name not in seen_docs:
                seen_docs.add(doc_name)

                top_chunks.append({
                    "text": chunk.text,
                    "document": doc_name,
                    "score": score
                })

            if len(top_chunks) == top_k:
                break

        print(f"✅ Retrieved {len(top_chunks)} UNIQUE chunks")

        return top_chunks