from django.urls import path
from .views import UploadPolicyView,PolicyQueryView
urlpatterns = [
    path('upload/', UploadPolicyView.as_view()),
    path('query/', PolicyQueryView.as_view()), 
]