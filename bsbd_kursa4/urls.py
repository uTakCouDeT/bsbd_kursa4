from django.contrib import admin
from django.urls import path, include, re_path
from backend.views import index
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('backend.urls')),
    path('accounts/login/', LoginView.as_view(), name='login'),
    path('accounts/logout/', LogoutView.as_view(), name='logout'),
    path('', index, name='index'),
    re_path(r'^(?!api|admin|static|media|accounts).*$', index, name='index-catchall'),
]
