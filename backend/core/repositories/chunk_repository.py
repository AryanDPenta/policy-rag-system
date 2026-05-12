from apps.policies.models import PolicyChunk


class ChunkRepository:

    @staticmethod
    def create_chunk(document, text, embedding):
        return PolicyChunk.objects.create(
            document=document,
            text=text,
            embedding=embedding
        )