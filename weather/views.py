from django.shortcuts import render
from django.http import HttpResponse


def hello_world(request):
    return render(request, 'visualization.html', {"hello": "你好你好你好嗎"})
# Create your views here.
