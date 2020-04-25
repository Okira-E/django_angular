from django.urls import path

from . import views

urlpatterns = [
    path('', views.PostAPIView.as_view(), name='posts_api'),
    path('<int:id>/', views.DetailedPostAPIView.as_view(), name='post_api'),   # GET detailed post, Delete, Update, Partial Update
]