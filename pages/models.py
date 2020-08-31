from django.db import models
from django.contrib.auth.models import User

class  Room(models.Model):
    ROOM_TYPES = (
        (1, 'Single'),
        (2, 'Double'),
        (3, 'Triple'),
    )

    name = models.CharField(max_length=50)
    status = models.CharField(max_length=30, blank=True)
    room_number = models.IntegerField(blank=True, null=True)
    nobeds = models.IntegerField(blank=True, null=True)
    room_type = models.PositiveSmallIntegerField(choices=ROOM_TYPES)



class Post(models.Model):
    content = models.TextField()
    liked = models.ManyToManyField(User,blank=True)

    def __str__(self):
        return str(self.id)
    