from django.urls import path


from . import views
from . import apiviews

urlpatterns = [
    path('', views.auth),
    path('catalog/', views.catalog),
    path('catalog/course/<course_id>/', views.course),
    path('student/<student_id>', views.personal_office_student),
    path('parent/<parent_id>', views.personal_office_parent),
    path('teacher/<teacher_id>', views.personal_office_teacher),
]

