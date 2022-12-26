from django.http import HttpResponseRedirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core import serializers
from .views import *
from django.shortcuts import redirect

from .globalFunction import *
from .models import *

user_type = {"student": Student, "parent": Parent, "teacher": Teacher}


class Reg(APIView):
    def post(self, request):
        data = request.data
        if data["name"] == "" and not data["name"].isalpha():
            return Response(
                {"error": 'Поле "Имя" должно быть заполнено и содержать только буквы'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if data["surname"] == "" and not data["name"].isalpha():
            return Response(
                {
                    "error": 'Поле "Фамилия" должно быть заполнено и содержать только буквы'
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        if data["patronymic"] != "" and not data["patronymic"].isalpha():
            return Response(
                {"error": 'Поле "Отчество" должно содержать только буквы'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            if data['phone'][0] == '8':
                data['phone'] = data['phone'][1:]
            data['phone'] = int(data['phone'].replace('+7', ''))
        except:
            return Response(
                {'error': 'Поле "Номер телефона" должно начинаться с +7 или 8'},
                status=status.HTTP_400_BAD_REQUEST)
        user_t = user_type[data["user_type"]]
        data.pop("user_type")
        if search_obj(user_t, phone=data["phone"]) == None:
            create_obj(user_t, **data)
            return Response(status=status.HTTP_200_OK)
        return Response(
            {"error": "Пользователь с таким номером был зарегистрирован раннее"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class Auth(APIView):
    def post(self, request):
        try:
            if request.data["phone"][0] == "8":
                request.data["phone"][0] = ""
            request.data["phone"] = int(request.data["phone"].replace("+7", ""))
        except:
            return Response(
                {"error": 'Поле "Номер телефона" должно начинаться с +7 или 8'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        users = [
            search_obj(Student, **request.data),
            search_obj(Parent, phone=request.data["phone"]),
            search_obj(Teacher, phone=request.data["phone"]),
        ]
        type_users = ["student", "parent", "teacher"]
        flag = True
        for index in range(3):
            if users[index] != None:
                val = users[index][0].id
                type = type_users[index]
                flag = False
        if flag:
            return Response(
                {"error": "Данный пользователь не зарегистрирован в системе"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        response = Response(status=status.HTTP_200_OK)
        response.set_cookie(key="id", value=val, httponly=False)
        response.set_cookie(key="type", value=type, httponly=False)
        response.set_cookie(key="is_login", value=True, httponly=False)
        return response


class АddСourse(APIView):
    def post(self, request):
        data = request.data
        id = request.COOKIES.get("id")
        type = request.COOKIES.get("type")
        is_login = request.COOKIES.get("is_login")
        points = 0

        if is_login == "True" and type == "teacher":
            for task in data["tasks"].values():
                if task["point"] != "":
                    points += int(task["point"])
            teacher = search_obj(Teacher, id=id)[0]
            course = create_obj(
                Course,
                title=data["title"],
                description=data["description"],
                max_point=points,
                theory=data["theory"],
                teacher=teacher,
            )
            for task in data["tasks"].values():
                if (
                    task["subject_area"] != ""
                    and task["theme"] != ""
                    and task["point"] != ""
                    and task["text"] != ""
                ):
                    task_=create_obj(
                        Task,
                        number=task["number"],
                        type=search_obj(
                            TaskType,
                            subject_area=task["subject_area"],
                            theme=task["theme"],
                        )[0],
                        point=task["point"],
                        text=task["text"],
                        course=course,
                    )
                    for variant in task['variants'].values():
                        if variant['text'] != "":
                            create_obj(
                                AnswerOption,
                                task=task_,
                                text=variant['text'],
                                is_right=variant['is_right']=="true"
                                )

        return Response()
