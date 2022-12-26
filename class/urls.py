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

    path('api/authorizations', apiviews.Auth.as_view()),
    path('api/registrations', apiviews.Reg.as_view()),
    path('api/add-course/', apiviews.АddСourse.as_view()),
    path('api/save-course-progress/', apiviews.SaveCourseProgress.as_view()),
]

