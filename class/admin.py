from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Student)
admin.site.register(Statistic)
admin.site.register(Parent)
admin.site.register(ParentStudent)
admin.site.register(Course)
admin.site.register(Task)
admin.site.register(AnswerOption)
admin.site.register(TaskStatistic)
admin.site.register(StudentCourse)
admin.site.register(Teacher)