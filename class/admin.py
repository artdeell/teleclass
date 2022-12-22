from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Parent)
admin.site.register(Child)
admin.site.register(Course)
admin.site.register(Task)
admin.site.register(ActualCourse)
admin.site.register(ActualTask)
admin.site.register(Variant)