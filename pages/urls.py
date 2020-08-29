from django.urls import path
from pages import views
from .views import index,RoomCreate,RoomUpdate

app_name = 'pages'

urlpatterns = [
    path('',index, name="index"),
    path('rooms/create', RoomCreate, name='room_create'),
    path('rooms/<int:room_id>/update', RoomUpdate, name='room_update'),
]
