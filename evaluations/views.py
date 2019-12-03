import xlrd
import datetime
from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.template import RequestContext
from evaluations.models import Question, Answer, Response, Student, Instructor
from evaluations.registration_parser import RegistrationParser


# note using same endpoint for both get/post requests
class Survey(View):
    # any dynamic content would be injected here to the survey (none for initial demo)

    def get(self, request):
        context = {
            "questions": Question.objects.all()
        }
        return render(request, "survey.html", context)

    # the html form for the survey would be parsed and models would be created here
    def post(self, request):
        for response in request.POST:
            if response[:8] == "response":
                question_id = int(response.split("_")[1])
                response_text = request.POST[response]
                q = Question.objects.get(id=question_id)
                tr = TextResponse(question=q, feedback=response_text)
                tr.save()
        return HttpResponse("Response Saved")


class Questions(View):
    def get(self, request):
        context = {
            "questions": Question.objects.all()
        }
        return render(request, "questions.html", context)

    def post(self, request):
        q = Question(prompt=request.POST["question-text"])
        q.save()
        return HttpResponse("Question Saved")


class Responses(View):
    def get(self, request):
        context = {
            "responses": Response.objects.all()
        }
        return render(request, "responses.html", context)
    def post(self, request):
        for response in request.POST:
            for answer in response:
                tr = Answer(prompt=request.POST["response-text"])
                tr.save()
        return HttpResponse("Response Saved")

def parser(request):
    rp = RegistrationParser("input.xlsx")
    rp.parse_all()
    s = Student.objects.all()[0]
    i = s.id
    t = s.token
    o = "surveys/" + i + "/" + t
    return HttpResponse(o)


def surveys(request, student_id, token):
    student = Student.objects.get(id=student_id)
    if token == student.token:
        return HttpResponse("Access Granted")
    else:
        return HttpResponse("Access Denied")
