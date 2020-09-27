from django.shortcuts import get_object_or_404, redirect, render
from .models import Room,Post
from django.http import JsonResponse, QueryDict
from .forms import RoomForm,PostForm,CustomUserCreationForm
from django.template.loader import render_to_string

from django.views.generic.edit import CreateView
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.urls import reverse
from django.contrib.auth.models import User
from .forms import UserLoginForm
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as do_logout
from django.http.response import HttpResponse


def logout(request):
    do_logout(request)
    return redirect('pages:signin')


   


def PostListView(request):

    ctx = {}
    posts = Post.objects.all()

    page_number = request.GET.get('page')
    paginator = Paginator(posts, 3)
    object_list = paginator.get_page(page_number)

    ctx['object_list'] = object_list

    ctx['form'] = PostForm()

    return render(request,'pages/posts.html',ctx)

def pages(request):
    posts = Post.objects.all()
    page_number = request.GET.get('page')
    paginator = Paginator(posts, 3)
    object_list = paginator.get_page(page_number)
    print(page_number)
    return render(request,'pages/includes/post_list.html',{'object_list':object_list})

def create_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        data = {}
        if form.is_valid():
            form.save()
            data['form_is_valid'] = True
        else:
            data['form_is_valid'] = False
        
        context = {'form': form}
        data['html_form'] = render_to_string('pages/includes/create_post.html', context, request=request)            
        
        posts = Post.objects.all()
        page_number = request.GET.get('page')
        paginator = Paginator(posts, 3)
        object_list = paginator.get_page(page_number)        

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
    if request.method == 'POST':
    
        post = Post.objects.get(pk=post_id)
        
        
        if user in post.liked.all():
            post.liked.remove(user)
            
            
        else:
            post.liked.add(user)
            
            

    return render(request,'pages/includes/single_post.html',{'obj':post})
        

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

def signin(request):
    if request.method == 'POST':
        form = UserLoginForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('pages:list_posts')
            else:
                return redirect('pages:signin')
    else:
        form = UserLoginForm()
    return render(request = request,
                    template_name = "pages/signin.html",
                    context={"form":form})

def index(request):
    rooms = Room.objects.all()
    page_number = request.GET.get('page')
    paginator = Paginator(rooms, 6)
    try:
        object_list = paginator.page(page_number)
    except PageNotAnInteger:

        object_list = paginator.page(1)
    except EmptyPage:
        if request.is_ajax():
            print('empty')
            return HttpResponse('')
    
    if request.is_ajax():
        return render(request,
        'pages/includes/room_list.html',
        { 'rooms':object_list})    
    return render(request,'pages/index.html',{'rooms':object_list})


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
            room = Room.objects.latest('id')
            data['html_room'] = render_to_string('pages/includes/single_room.html', {
                'room': room
            })
        else:
            data['form_is_valid'] = False

    context = {'form': form}
    data['html_form'] = render_to_string(template_name, context, request=request)
    return JsonResponse(data)    

def update_room_form(request, form, template_name,room_id):
    data = dict()
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            data['form_is_valid'] = True
            data['room_id'] = room_id
            
            room = Room.objects.get(id=room_id)
            data['html_room'] = render_to_string('pages/includes/single_room.html', {
                'room': room
            })
        else:
            data['form_is_valid'] = False

    context = {'form': form}
    data['html_form'] = render_to_string(template_name, context, request=request)
    return JsonResponse(data)    


def RoomUpdate(request, room_id):
    room = get_object_or_404(Room, pk = room_id)
    if request.method == 'POST':
        print(request.POST)
        form = RoomForm(request.POST, instance=room)
    else:
        form = RoomForm(instance=room)
    return update_room_form(request, form, 'pages/includes/update_room.html',room_id)

   

def RoomDelete(request,room_id):
    room = get_object_or_404(Room, pk=room_id)
    data = dict()
    if request.method == 'POST':
        room.delete()
        data['form_is_valid'] = True  # This is just to play along with the existing code
        # rooms = Room.objects.all()
        data['room_id'] = room_id
        # data['html_room_list'] = render_to_string('pages/includes/room_list.html', {
        #     'rooms': rooms
        # })
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
