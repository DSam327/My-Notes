from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('notes/', views.getnotes),
    path('notes/<str:pk>', views.getnote),
]
