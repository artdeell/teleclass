from django.urls import path


from . import views
from . import apiviews

urlpatterns = [
    path('', views.auth),
    path('catalog/', views.catalog),
    path('catalog/course/<course_id>/', views.course),
    path('/<user_id>', views.personal_office),
]

