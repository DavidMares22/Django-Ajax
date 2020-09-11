from django.urls import path
from pages import views
from .views import index,RoomCreate,RoomUpdate,RoomDelete,like_post,create_post,delete_post,search_titles

app_name = 'pages'

urlpatterns = [
    path('',index, name="index"),
    path('rooms/create', RoomCreate, name='room_create'),
    path('rooms/<int:room_id>/update', RoomUpdate, name='room_update'),
    path('rooms/<int:room_id>/delete', RoomDelete, name='room_delete'),
    path('signup/', views.SignUpView.as_view(), name='signup'),
    path('signin/', views.signin, name='signin'),
    path("logout/", views.logout, name="logout"),
    path('ajax/validate_username/', views.validate_username, name='validate_username'),
    path('posts/',views.PostListView,name="list_posts"),
    path('like/<int:post_id>',like_post,name="like_post"),
    path('create_post/', create_post, name="create_post"),
    path('delete_post/', delete_post, name="delete_post"),
    path('search_titles/', search_titles, name="search_titles"),
    path('pages/', views.pages, name="pages"),
]
