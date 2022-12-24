from django.shortcuts import render
from .models import Course, Task, AnswerOption

# Create your views here.
def auth(request):
    return render(request, 'auth.html', {'title': 'Авторизация'})

def catalog(request):
    catalog = Course.objects.all().order_by('-creation_date')
    return render(request, 'catalog.html', {
        'title': 'Каталог',
        'catalog': catalog
        })
    
def course(request, course_id):
    course = Course.objects.filter(id=course_id)[0]
    tasks = Task.objects.filter(course=course)
    answer_options = []
    for task in tasks:
        for answer_option in AnswerOption.objects.filter(task=task):
            answer_options.append(answer_option)
    return render(request, 'course.html',  {
        'title': course.title,
        'course': course,
        'tasks': tasks,
        'answer_options': answer_options
         })
