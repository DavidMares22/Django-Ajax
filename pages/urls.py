from django.urls import path
from pages import views
from .views import index,RoomCreate,RoomUpdate,RoomDelete,like_post

app_name = 'pages'

urlpatterns = [
    path('',index, name="index"),
    path('rooms/create', RoomCreate, name='room_create'),
    path('rooms/<int:room_id>/update', RoomUpdate, name='room_update'),
    path('rooms/<int:room_id>/delete', RoomDelete, name='room_delete'),
    path('signup/', views.SignUpView.as_view(), name='signup'),
    path('ajax/validate_username/', views.validate_username, name='validate_username'),
    path('posts/',views.PostListView.as_view(),name="list_posts"),
    path('like/<int:post_id>',like_post,name="like_post"),
]
