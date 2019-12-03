"""ELSE URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
import evaluations.views
from django.views.generic import TemplateView

urlpatterns = [
	path('api-auth/', include('rest_framework.urls')),
	path('rest-auth/', include('rest_auth.urls')),
    path("admin/", admin.site.urls),
	path("parser", evaluations.views.parser),
    path("surveys/<slug:student_id>/<slug:token>", evaluations.views.surveys),

    #path("parser", evaluations.views.parser),
	#path("survey", evaluations.views.Survey.as_view()),
	#path("questions", evaluations.views.Questions.as_view()),
	#path("responses/", evaluations.views.Responses.as_view()),

    # provost login
    # authenticated endpoints
    # manual start/stop survey collection
    # set start/stop dates
    # parse spreadsheet upload
    re_path('.*', TemplateView.as_view(template_name='index.html'))
]
