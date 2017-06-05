# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Employee(models.Model):
	firstName = models.CharField(max_length=150, blank=False, null=False)
	lastName = models.CharField(max_length=150, blank=False, null=False)
	dob = models.DateField(auto_now=False, auto_now_add=False, blank=False, null=False)
	email = models.EmailField(max_length=200, blank=False, null=False)
	address = models.TextField(max_length=500, blank=False, null=False)
	city = models.CharField(max_length=50, blank=False, null=False)
	pin_code = models.CharField(max_length=20, blank=False, null=False)
	state = models.CharField(max_length=20, blank=False, null=False)
	designation = models.CharField(max_length=50, blank=False, null=False)
	card_number = models.CharField(max_length=100, blank=False, null=False)
	mobile = models.CharField(max_length=25,blank=False, null=False)
	image = models.FileField(max_length=100 ,upload_to="uploads")

	# def user_directory_path(instance, filename):
	# 	 # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
	# 	return 'employee_{0}/{1}'.format(instance.Employee.id, filename)


	def __str__(self):
		return self.firstName


