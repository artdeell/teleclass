from django.db import models
from django.utils import timezone

class Student(models.Model):
    surname = models.TextField('Фамилия')
    name = models.TextField('Имя')
    patronymic = models.TextField('Отчество')
    phone = models.TextField('Номер телефона')
    password = models.TextField('Пароль')

    class Meta:
        verbose_name = "Ученик"
        verbose_name_plural = "Ученики"

    def __str__(self):
        return str(f"{self.surname}<->{self.name}")

class Statistic(models.Model):
    student = models.OneToOneField(Student, on_delete=models.PROTECT, primary_key=False)

    class Meta:
        verbose_name = "Ученик"
        verbose_name_plural = "Ученики"

    def __str__(self):
        return str(f"{self.surname}<->{self.name}")

class Parent(models.Model):
    surname = models.TextField('Фамилия')
    name = models.TextField('Имя')
    patronymic = models.TextField('Отчество')
    phone = models.TextField('Номер телефона')
    password = models.TextField('Пароль')
    

    class Meta:
        verbose_name = "Родитель"
        verbose_name_plural = "Родители"

    def __str__(self):
        return str(f"{self.surname}<->{self.name}")

class ParentStudent(models.Model):
    parent = models.ForeignKey(Parent, on_delete=models.CASCADE, null=False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=False)

    class Meta:
        verbose_name = "РодительУченик"
        verbose_name_plural = "РодителиУченики"

    def __str__(self):
        return str(f"{self.parent}<->{self.student}")

class Course(models.Model):
    title = models.TextField('Название')
    description = models.TextField('Описание')
    progress = models.TextField('Прогресс')
    max_point = models.TextField('Максимальный балл')
    theory = models.TextField('Теория')
    creation_date = models.DateTimeField('Дата создания')

    class Meta:
        verbose_name = "Курс"
        verbose_name_plural = "Курсы"

    def __str__(self):
        return str(f"{self.title}<->{self.creation_date}")

class Task(models.Model):
    number = models.TextField('Номер')
    type = models.TextField('Тип')
    point = models.TextField('Балл')
    text = models.TextField('Текст задания')
    picture = models.ImageField('Картинка')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=False)

    class Meta:
        verbose_name = "Задание"
        verbose_name_plural = "Задания"

    def __str__(self):
        return str(f"{self.number}<->{self.type}")

class AnswerOption(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=False)
    text = models.TextField('Текст')
    is_right = models.BooleanField('Правильный')

    class Meta:
        verbose_name = "Задание"
        verbose_name_plural = "Задания"

    def __str__(self):
        return str(f"{self.is_right}<->{self.text}")

class TaskStatistic(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=False)
    is_right = models.BooleanField('Правильность решения')

    class Meta:
        verbose_name = "Статистика задания"
        verbose_name_plural = "Статистика заданий"

    def __str__(self):
        return str(f"{self.task}<->{self.student}<->{self.is_right}")

class StudentCourse(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=False)

    class Meta:
        verbose_name = "УченикКурс"
        verbose_name_plural = "УченикиКурсы"

    def __str__(self):
        return str(f"{self.student}<->{self.course}")

class Teacher(models.Model):
    surname = models.TextField('Фамилия')
    name = models.TextField('Имя')
    patronymic = models.TextField('Отчество')
    phone = models.TextField('Номер телефона')
    password = models.TextField('Пароль')

    class Meta:
        verbose_name = "Учитель"
        verbose_name_plural = "Учителя"

    def __str__(self):
        return str(f"{self.surname}<->{self.name}")