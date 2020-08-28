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


class  RoomDelete(View):
    def  get(self, request, pk):
        data =  dict()
        room = Room.objects.get(pk=pk)
        if room:
            room.delete()
            data['message'] =  "Room deleted!"
        else:
            data['message'] =  "Error!"
        return JsonResponse(data)
