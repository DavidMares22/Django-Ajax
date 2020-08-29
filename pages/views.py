from django.views.generic import View
from django.shortcuts import render
from .models import Room
from django.http import JsonResponse
from .forms import RoomForm
from django.forms.models import model_to_dict
from django.template.loader import render_to_string

def index(request):
    return render(request,'pages/index.html')

class  RoomList(View):
    def  get(self, request):
        rooms =  list(Room.objects.all().values())
        data =  dict()
        data['rooms'] = rooms
        return JsonResponse(data)


class  RoomDelete(View):
    def  post(self, request, pk):
        data =  dict()
        room = Room.objects.get(pk=pk)
        if room:
            room.delete()
            data['message'] =  "Room deleted!"
        else:
            data['message'] =  "Error!"
        return JsonResponse(data)


def RoomCreate(request):
    data = dict()

    if request.method == 'POST':
        form = RoomForm(request.POST)
        if form.is_valid():
            form.save()
            data['form_is_valid'] = True
        else:
            data['form_is_valid'] = False
    else:
        form = RoomForm()

    context = {'form': form}
    
    data['html_form'] = render_to_string('pages/includes/create_room.html',
        context,
        request=request
    )
    return JsonResponse(data)

    # form = RoomForm()
    # context = {'form': form}
    # html_form = render_to_string('pages/includes/create_room.html',
    #     context,
    #     request=request,
    # )
    # return JsonResponse({'html_form': html_form})