# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Employee
# Register your models here.


class EmployeeModelAdmin(admin.ModelAdmin):
	list_display= ["firstName", "lastName", "email", "designation","card_number"]



admin.site.register(Employee,EmployeeModelAdmin)



