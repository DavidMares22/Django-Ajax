from django.shortcuts import get_object_or_404, render
from .models import Room
from django.http import JsonResponse
from .forms import RoomForm
from django.template.loader import render_to_string
from django.contrib.auth.forms import UserCreationForm
from django.views.generic.edit import CreateView
from django.urls import reverse
from django.contrib.auth.models import User



def validate_username(request):
    username = request.GET.get('username', None)
    data = {
        'is_taken': User.objects.filter(username__exact=username).exists()
    }
    return JsonResponse(data)

class SignUpView(CreateView):
    template_name = 'pages/signup.html'
    form_class = UserCreationForm
    def get_success_url(self):
        return reverse('pages:index')



def index(request):
    rooms = Room.objects.all()
    return render(request,'pages/index.html',{'rooms':rooms})


def RoomCreate(request):
    if request.method == 'POST':
        form = RoomForm(request.POST)
    else:
        form = RoomForm()

    return save_room_form(request,form,'pages/includes/create_room.html')        
        

def save_room_form(request, form, template_name):
    data = dict()
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            data['form_is_valid'] = True
            rooms = Room.objects.all()
            data['html_room_list'] = render_to_string('pages/includes/room_list.html', {
                'rooms': rooms
            })
        else:
            data['form_is_valid'] = False

    context = {'form': form}
    data['html_form'] = render_to_string(template_name, context, request=request)
    return JsonResponse(data)    


def RoomUpdate(request, room_id):
    room = get_object_or_404(Room, pk = room_id)
    if request.method == 'POST':
        form = RoomForm(request.POST, instance=room)
    else:
        form = RoomForm(instance=room)
    return save_room_form(request, form, 'pages/includes/update_room.html')

   

def RoomDelete(request,room_id):
    room = get_object_or_404(Room, pk=room_id)
    data = dict()
    if request.method == 'POST':
        room.delete()
        data['form_is_valid'] = True  # This is just to play along with the existing code
        rooms = Room.objects.all()
        data['html_room_list'] = render_to_string('pages/includes/room_list.html', {
            'rooms': rooms
        })
    else:
        context = {'room': room}
        data['html_form'] = render_to_string('pages/includes/room_delete.html',
            context,
            request=request,
        )
    return JsonResponse(data)