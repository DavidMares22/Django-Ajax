from django.urls import path
from pages import views
from .views import index,RoomCreate

app_name = 'pages'

urlpatterns = [
    path('',index, name="index"),
    path('rooms/list', views.RoomList.as_view(), name='room_list'),
    path('rooms/delete/<int:pk>', views.RoomDelete.as_view(), name='room_delete'),
    path('rooms/create', RoomCreate, name='room_create'),
]
