from django.views.generic import View
from django.shortcuts import render
from .models import Room
from django.http import JsonResponse

def index(request):
    return render(request,'pages/index.html')

class  RoomList(View):
    def  get(self, request):
        rooms =  list(Room.objects.all().values())
        data =  dict()
        data['rooms'] = rooms
        return JsonResponse(data)
