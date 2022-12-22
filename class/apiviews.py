from django.http import HttpResponseRedirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import json


from .globalFunction import *
from .models import *


class Registraton(APIView):
    def post(self, request):
        if search_obj(Parent, login=request.data['login']) == None: #and request.data['user_type'] == 'parent':
            obj = create_obj(Parent, **request.data)
            return Response(status=status.HTTP_200_OK)
        elif search_obj(Child, login=request.data['login']) == None:# and request.data['user_type'] == 'child':
            obj = create_obj(Child, **request.data)
            return Response(status=status.HTTP_200_OK)
        return Response({'error':'Логин уже используется'}, status=status.HTTP_400_BAD_REQUEST)


class Autorizations(APIView):
    def post(self, request):
        parent = search_obj(Parent, **request.data)
        child = search_obj(Child, **request.data)
        if parent != None:
            return Response({'number': parent.id, 'type':'parent'}, status=status.HTTP_200_OK)
        elif child != None:
            return Response({'number': child.id, 'type':'child'}, status=status.HTTP_200_OK)
        return Response({'error': 'Не найдено пользователь с таким логином или паролем'}, status=status.HTTP_400_BAD_REQUEST)


class Сourses(APIView):
    def get(self, request):
        return Response(search_all_obj(Course))

{
    status: 'parent'
}