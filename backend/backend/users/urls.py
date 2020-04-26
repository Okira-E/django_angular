from django.urls import path

from . import views

urlpatterns = [
    path('register/', views.CreateUserView.as_view(), name="register_user"),
    path('login/', views.LoginUserView.as_view(), name="login_user"),
    # path('<int:id>/update/', views.UpdateUserView.as_view(), name="update_user"),
]
