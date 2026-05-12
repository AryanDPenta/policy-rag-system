from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
import os

from .models import PolicyDocument
from .serializers import PolicyDocumentSerializer

from core.services.content_extraction_service import ContentExtractionService
from core.services.rag_service import RAGService

# 👇 NEW IMPORT
from core.services.qa_service import QAService


# ---------------- UPLOAD ----------------
class UploadPolicyView(APIView):

    def post(self, request):
        file = request.FILES.get('file')

        if not file:
            return Response({"error": "No file provided"}, status=400)

        doc = PolicyDocument.objects.create(
            file=file,
            name=file.name
        )

        file_path = doc.file.path

        # Extract text
        text = ContentExtractionService.extract_text(file_path)

        # Process RAG
        RAGService.process_document(doc, text)

        return Response(PolicyDocumentSerializer(doc).data, status=201)


# ---------------- QUERY (NEW) ----------------
class PolicyQueryView(APIView):

    def post(self, request):
        query = request.data.get("query")

        if not query:
            return Response({"error": "Query required"}, status=400)

        answer = QAService.answer_query(query)

        return Response({"answer": answer})