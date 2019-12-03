from django.db import models


class Student(models.Model):
    id = models.CharField(max_length=16, primary_key=True)
    email = models.CharField(max_length=256)
    token = models.CharField(max_length=64)

    def clean(self):
        print("cleaning student")


class Instructor(models.Model):
    email = models.CharField(max_length=256, primary_key=True)
    last_name = models.CharField(max_length=256)
    token = models.CharField(max_length=64)


class Course(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    students = models.ManyToManyField(Student, through="Enrollment")
    title = models.CharField(max_length=256)
    campus = models.CharField(max_length=256)
    component = models.CharField(max_length=8)
    grade_base = models.CharField(max_length=8)
    subject = models.CharField(max_length=4)
    catalog = models.CharField(max_length=4)
    career = models.CharField(max_length=4)
    course_type = models.CharField(max_length=2)
    term = models.PositiveSmallIntegerField()
    section = models.PositiveSmallIntegerField()
    total_enrollment = models.PositiveSmallIntegerField()
    units = models.PositiveSmallIntegerField()
    location = models.PositiveSmallIntegerField()
    session = models.PositiveSmallIntegerField()
    combined = models.BooleanField()


class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    grade = models.CharField(max_length=2, null=True, blank=True)
    token = models.CharField(max_length=64)
    drop_date = models.DateField(null=True, blank=True, default="")
    add_date = models.DateField()
    dropped = models.BooleanField()
    evaluated = models.BooleanField(default=False)

class Question(models.Model):
    FREE_RESPONSE = "FR"
    RADIO_RESPONSE = "RR"
    DROPDOWN_RESPONSE = "DR"
    RESPONSE_TYPES = [
        (FREE_RESPONSE, "Free"),
        (RADIO_RESPONSE, "Radio"),
        (DROPDOWN_RESPONSE, "Dropdown"),
    ]
    readOnly = models.BooleanField(default=True)
    # the actual question
    prompt = models.CharField(max_length=1000)
    questionType = models.CharField(max_length=2, choices=RESPONSE_TYPES, default=RADIO_RESPONSE)
    #response_type = models.CharField(max_length=2, choices=RESPONSE_TYPES)
    # use options for storing data such as
    # 1,5,10,15
    # for # of hours spent per night, score 1-5 etc
    #options = models.CharField(max_length=256)


class Answer(models.Model):
    FREE_RESPONSE = "FR"
    RADIO_RESPONSE = "RR"
    DROPDOWN_RESPONSE = "DR"
    RESPONSE_TYPES = [
        (FREE_RESPONSE, "Free"),
        (RADIO_RESPONSE, "Radio"),
        (DROPDOWN_RESPONSE, "Dropdown"),
    ]
    questionType = models.CharField(max_length=2, choices=RESPONSE_TYPES, default=RADIO_RESPONSE)
    prompt = models.CharField(max_length=1000)
    feedback = models.CharField(max_length=1000)

class Response(models.Model):
    #readOnly = models.BooleanField(default=True)
    answers = models.ManyToManyField(Answer)
