from django.contrib import admin
from .models import Client, Employee, Service, Project, Campaign, Request, Report


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_info')
    search_fields = ('name',)


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'contact_info')
    search_fields = ('name', 'position')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'cost')
    search_fields = ('name', 'category')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'deadline', 'employee', 'budget')
    search_fields = ('name',)
    list_filter = ('employee',)


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('name', 'goal', 'deadline', 'budget')
    search_fields = ('name', 'goal')


@admin.register(Request)
class RequestAdmin(admin.ModelAdmin):
    list_display = ('client', 'project', 'service', 'created_at', 'cost')
    search_fields = ('client__name', 'project__name', 'service__name')
    list_filter = ('service',)


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('project', 'campaign', 'employee')
    search_fields = ('project__name', 'campaign__name', 'employee__name')
    list_filter = ('employee',)
