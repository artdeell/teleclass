from django.http import HttpResponseRedirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core import serializers


from .globalFunction import *
from .models import *


class Registraton(APIView):
    def post(self, request):
        if search_obj(Parent, login=request.data['login']) == None and request.data['user_type'] == 'parent':
            request.data.pop('user_type')
            obj = create_obj(Parent, **request.data)
            return Response(status=status.HTTP_200_OK)
        elif search_obj(Child, login=request.data['login']) == None and request.data['user_type'] == 'child':
            request.data.pop('user_type')
            obj = create_obj(Child, **request.data)
            return Response(status=status.HTTP_200_OK)
        return Response({'error':'Логин уже используется'}, status=status.HTTP_400_BAD_REQUEST)


class Autorizations(APIView):
    def post(self, request):
        parent = search_obj(Parent, **request.data)
        child = search_obj(Child, **request.data)
        if parent != None:
            return Response({'number': parent[0].id, 'type':'parent'}, status=status.HTTP_200_OK)
        elif child != None:
            return Response({'number': child[0].id, 'type':'child'}, status=status.HTTP_200_OK)
        return Response({'error': 'Не найдено пользователь с таким логином или паролем'}, status=status.HTTP_400_BAD_REQUEST)


class Сourses(APIView):
    def get(self, request, id):
        # courses = search_all_obj(Course)
        # respons = []
        # for cours in courses:
        #     respons.append(
        #         {
        #             'name': name
        #         }
        #     )
        return Response(serializers.serialize('json', search_all_obj(Course)))

    def post(self, request, id):
        return Response(serializers.serialize('json', search_obj(Course, **request.data)))

class TakeCourse(APIView):
    def post(self, request, id):
        cours = search_obj(Course, name=request.data['name'])[0]
        if request.data['user_type']=='chlid':
            child = search_obj(Child, id=id)
            if len(search_obj(ActualCourse, child=child))>0:
                return Response({'error': 'Данный курс был выбран для прохождения ранее'}, status=status.HTTP_400_BAD_REQUEST)
            act_cours = create_obj(ActualCourse, course=cours, mark=0, child=child)
            tasks = search_obj(Task, course=cours)
            for task in tasks:
                create_obj(ActualTask, actual_course=act_cours, task=task, mark=task.mark, time=0, count=0, status=False)
            return Response({id: act_cours.id}, status=status.HTTP_200_OK)
                