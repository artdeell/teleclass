from django.http import HttpResponseRedirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from globalFunction import *
from models import *


class Registraton(APIView):
    def post(self, request):
        # Добавить проверку на лоины
        if request.data.get('parent') != None:
            obj = create_obj(Child, request.data)
        else:
            obj = create_obj(Parent, request.data)
        return obj


class Autorizations(APIView):
    def get(self, request):
        parent = search_obj(Parent, request.data)
        child = search_obj(Child, request.data)
        if parent != None:
            return parent
        elif child != None:
            return child
        return Response({'error': 'Не найдено пользователь с таким логином или паролем'}, status=status.HTTP_400_BAD_REQUEST)
