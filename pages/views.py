from django.shortcuts import get_object_or_404, render
from .models import Room,Post
from django.http import JsonResponse, QueryDict
from .forms import RoomForm,PostForm,CustomUserCreationForm
from django.template.loader import render_to_string

from django.views.generic.edit import CreateView
from django.views.generic import ListView
from django.urls import reverse
from django.contrib.auth.models import User


class PostListView(ListView):
    model = Post
    template_name = 'pages/posts.html'

    def get_context_data(self, **kwargs):          
        context = super().get_context_data(**kwargs)                             
        context["form"] = PostForm()
        return context    

def create_post(request):
    if request.method == 'POST':
        post_text = request.POST.get('the_post')
        data = {}

        post = Post(content=post_text)
        post.save()
        object_list = Post.objects.all()

        data['html_post_list'] = render_to_string('pages/includes/post_list.html', {
                'object_list': object_list
            },request = request)
        

        return JsonResponse(data)
 
    else:

        return JsonResponse({"nothing to see": "this isn't happening"})
    
def delete_post(request):
    if request.method == 'DELETE':

        post = Post.objects.get(
            pk=int(QueryDict(request.body).get('postpk')))

        post.delete()

        data = {}
        data['msg'] = 'Post was deleted.'

        return JsonResponse(data)
    else:
        return JsonResponse({"nothing to see": "this isn't happening"})
 
        
def like_post(request,post_id):
    user = request.user
    data = dict()
    if request.method == 'POST':
    
        post = Post.objects.get(pk=post_id)
        data['id'] = post_id
        
        if user in post.liked.all():
            post.liked.remove(user)
            data['status'] = 'like'
            
        else:
            post.liked.add(user)
            
            data['status'] = 'Unlike'

    return JsonResponse(data)
        

def validate_username(request):
    username = request.GET.get('username', None)
    data = {
        'is_taken': User.objects.filter(username__exact=username).exists()
    }
    return JsonResponse(data)

class SignUpView(CreateView):    
    form_class = CustomUserCreationForm
    template_name = 'pages/signup.html'
    
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



def search_titles(request):
    if request.method == "POST":
        search_text = request.POST['search_text']
    else:
        search_text = ''

    articles = Post.objects.filter(content__contains=search_text)

    return render(request,'pages/ajax_search.html',{'articles':articles})
