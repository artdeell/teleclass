from django.urls import path


from . import views
from . import apiviews

urlpatterns = [
    path('', views.auth),
    path('api/authorizations', apiviews.Auth.as_view()),
    path('api/registrations', apiviews.Reg.as_view()),
    # path('api/courses/<int:id>/list', apiviews.Сourses.as_view()),
    # path('api/courses/<int:id>/take', apiviews.TakeCourse.as_view()),
    # path('home/<int:id>/', views.auth)#Поменять
    path('catalog/course/<course_id>/', views.course),
    path('student/<student_id>', views.personal_office_student),
    path('parent/<parent_id>', views.personal_office_parent),
    path('teacher/<teacher_id>', views.personal_office_teacher),
]

