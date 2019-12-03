from django.contrib import admin

from .models import Question, Answer, Response

admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Response)
# Register your models here.
