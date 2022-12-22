from django.urls import path


from . import views
from . import apiviews

urlpatterns = [
    path('auth/', views.auth),
    path('api/authorization', apiviews.Autorizations.as_view()),
    path('api/registrations', apiviews.Registraton.as_view()),
    path('courses/', apiviews.Сourses.as_view()),
    # path('home/<int:id>/')
]
