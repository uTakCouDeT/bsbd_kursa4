from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ClientViewSet, EmployeeViewSet, ServiceViewSet, ProjectViewSet,
    CampaignViewSet, RequestViewSet, ReportViewSet
)

router = DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'employees', EmployeeViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'campaigns', CampaignViewSet)
router.register(r'requests', RequestViewSet)
router.register(r'reports', ReportViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
