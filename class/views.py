from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import *

from .globalFunction import *

# Create your views here.
def auth(request):
    if 'is_login' in request.COOKIES and 'type' in request.COOKIES and 'id' in request.COOKIES:
        if request.COOKIES['is_login'] == 'True':
            return HttpResponseRedirect('/catalog/')
    return render(request,
        'auth.html', {
            'title': 'Авторизация'
        })

def catalog(request):
    catalog = Course.objects.all().order_by('-creation_date')
    return render(request, 'catalog.html', {
        'title': 'Каталог',
        'catalog': catalog
        })
    
def course(request, course_id):
    id = request.COOKIES.get('id')
    type = request.COOKIES.get('type')
    is_login = request.COOKIES.get('is_login')
    if is_login == 'True' and type=='student':
        course = Course.objects.filter(id=course_id)[0]
        if type == 'student':
            user = Student.objects.filter(id = id)[0]
            if search_obj(StudentCourse, course=course, student=user) == None:
                create_obj(StudentCourse, course=course, student=user, progress=0)
        tasks = Task.objects.filter(course=course)
        answer_options = []
        for task in tasks:
            for answer_option in AnswerOption.objects.filter(task=task):
                answer_options.append(answer_option)
        return render(request, 'course.html',  {
            'title': course.title,
            'course': course,
            'tasks': tasks,
            'answer_optiosns': answer_options
            })
    return HttpResponseRedirect(request._current_scheme_host)

def personal_office_student(request, student_id=1):
    id = request.COOKIES.get('id')
    type = request.COOKIES.get('type')
    is_login = request.COOKIES.get('is_login')
    if is_login == 'True' and id==student_id and type=='student':
        student = Student.objects.filter(id = student_id)[0]
        catalog = []
        for student_course in StudentCourse.objects.filter(student=student):
            catalog.append(student_course.course)
        if Statistic.objects.filter(student=student):
            statistic = Statistic.objects.filter(student=student)[0]
        else:
            statistic = None
        return render(request, 'personal-office-student.html', {
            'title': 'Личный кабинет',
            'student': student,
            'catalog': catalog,
            'statistic': statistic
            })
    return HttpResponseRedirect(request._current_scheme_host)

def personal_office_parent(request, parent_id=1):
    id = request.COOKIES.get('id')
    type = request.COOKIES.get('type')
    is_login = request.COOKIES.get('is_login')
    if is_login == 'True' and id==parent_id and type=='parent':
        parent = Parent.objects.filter(id = parent_id)[0]
        childs = []
        statistic = []
        if len(ParentStudent.objects.filter(parent=parent))>0:
            for parent_student in ParentStudent.objects.filter(parent=parent):
                childs.append(parent_student.student)
            if Statistic.objects.filter(student=parent_student.student):
                statistic.append(Statistic.objects.filter(
                    student=parent_student.student
                    )[0])
            else:
                statistic = None
        return render(request, 'personal-office-parent.html', {
            'title': 'Личный кабинет',
            'parent': parent,
            'childs': childs,
            'statistic': statistic
            })
    return HttpResponseRedirect(request._current_scheme_host)

def personal_office_teacher(request, teacher_id=1):
    id = request.COOKIES.get('id')
    type = request.COOKIES.get('type')
    is_login = request.COOKIES.get('is_login')
    if is_login == 'True' and id==teacher_id and type=='teacher':
        teacher = Teacher.objects.filter(id = teacher_id)[0]
        catalog = Course.objects.filter(teacher = teacher)
        return render(request, 'personal-office-teacher.html', {
            'title': 'Личный кабинет',
            'teacher': teacher,
            'catalog': catalog
            })
    return HttpResponseRedirect(request._current_scheme_host)