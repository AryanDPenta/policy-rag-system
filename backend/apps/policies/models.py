from django.db import models


class PolicyDocument(models.Model):
    file = models.FileField(upload_to='policies/')
    name = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class PolicyChunk(models.Model):
    document = models.ForeignKey(PolicyDocument, on_delete=models.CASCADE)
    text = models.TextField()
    embedding = models.JSONField()

    def __str__(self):
        return f"Chunk for {self.document.name}"