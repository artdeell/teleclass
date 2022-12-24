from django.shortcuts import render
from .models import Course

# Create your views here.
def auth(request):
    return render(request, 'auth.html', {'title': 'Авторизация'})

def catalog(request):
    catalog = Course.objects.all().order_by('-creation_date')
    return render(request, 'catalog.html', {'title': 'Каталог', 'catalog': catalog})
    
def course(request):
    return render(request, 'course.html')
