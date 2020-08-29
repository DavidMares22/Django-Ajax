from django.shortcuts import render
from .models import Room
from django.http import JsonResponse
from .forms import RoomForm
from django.template.loader import render_to_string

def index(request):
    rooms = Room.objects.all()
    return render(request,'pages/index.html',{'rooms':rooms})






def RoomCreate(request):
    data = dict()

    if request.method == 'POST':
        form = RoomForm(request.POST)
        if form.is_valid():
            form.save()
            data['form_is_valid'] = True
            rooms = Room.objects.all()
            data['html_room_list'] = render_to_string('pages/includes/room_list.html', {
                'rooms': rooms
            })                        
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

   