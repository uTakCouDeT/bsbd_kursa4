from django.contrib import admin
from django.urls import path, include, re_path
from backend.views import index, custom_logout
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('backend.urls')),
    path('accounts/login/', LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('accounts/logout/', custom_logout, name='logout'),
    path('', index, name='index'),
    re_path(r'^(?!api|admin|static|media|accounts).*$', index, name='index-catchall'),
]
