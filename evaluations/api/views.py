from rest_framework import viewsets

from evaluations.models import Question
from .serializers import QuestionSerializer

class QuestionViewSet(viewsets.ModelViewSet):
	serializer_class = QuestionSerializer
	queryset = Question.objects.all()
class AnswerViewSet(viewsets.ModelViewSet):
	serializer_class = AnswerSerializer
	queryset = Answer.objects.all()

class ResponseViewSet(viewsets.ModelViewSet):
	serializer_class = ResponseSerializer
	queryset = Response.objects.all()
