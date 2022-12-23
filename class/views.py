from django.shortcuts import render


# Create your views here.
def auth(request):
    return render(request, 'auth.html', {'title': 'Авторизация'})

def catalog(request, id):
    return render(request, 'catalog.html')

def course(request):
    return render(request, 'course.html')