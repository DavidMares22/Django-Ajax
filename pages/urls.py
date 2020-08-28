from django.urls import path
from pages import views
from .views import index

app_name = 'pages'

urlpatterns = [
    path('',index, name="index"),
    path('rooms/list', views.RoomList.as_view(), name='room_list'),
]
