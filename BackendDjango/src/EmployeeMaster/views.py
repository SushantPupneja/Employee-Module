	# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import simplejson
import json


from .models import Employee

# Create your views here.
@csrf_exempt
def addEmployee(request):
	try:
		if request.method == 'POST':
			f = request.FILES["file"]
			data = request.POST
			firstName = data.get('firstName')
			lastName = data.get('lastName')
			dob = data.get('dob')
			address = data.get('address')
			city = data.get('city')
			pin_code = data.get('pin_code')
			state = data.get('state')
			email = data.get('email')
			mobile = data.get('mobile')
			card_number = data.get('card_number')
			designation = data.get('designation')
		else:
			status = 'Success'
			message = 'But no data'
		
		try:
			add_new_employee = Employee.objects.create(firstName=firstName, lastName=lastName, dob=dob, address=address,
			city=city, pin_code=pin_code, state=state, email=email, mobile=mobile, card_number=card_number, designation=designation, image=f)
			add_new_employee.save()
			status = 'OK'
			message = 'Employee added Successfully'
		except Exception as e:
			print e
			status = 'save not worked'
			message = 'Employee not added'

		
		
	except Exception as e:
		print e
		status = 'Failed'
		message = 'Employee not added'
	

	return JsonResponse({'Status':status, 'Message':message})


@csrf_exempt
def listEmployee(request, *args, **kwargs):
	try:
		employee_data = []
		employee_list = Employee.objects.all()
		for employee in employee_list:
			employee_obj = {}
			employee_obj['id']          = employee.id
			employee_obj["firstName"]   = employee.firstName
			employee_obj["lastName"]    = employee.lastName
			employee_obj["dob"] 	    = employee.dob
			employee_obj["address"]     = employee.address
			employee_obj["city"]        = employee.city
			employee_obj["pin_code"]    = employee.pin_code
			employee_obj["state"]       = employee.state
			employee_obj["email"] 	    = employee.email
			employee_obj["mobile"]      = employee.mobile
			employee_obj["designation"] = employee.designation
			employee_obj["card_number"] = employee.card_number
			# employee_obj["image"] 		=
			employee_data.append(employee_obj)
		status = "success"
	except Exception as e:
		print e
		status = "failed"


	return JsonResponse({'employee_list':employee_data, 'Status':status})

	# callback = request.GET.get('callback')

	# if callback:
	# 	# a jsonp response!
	# 	employee_data = JSON_CALLBACK({
	# 		  employee_data
	# 		 })
	# 	print employee_data
 #        return HttpResponse(employee_data, "text/javascript")

@csrf_exempt
def editEmployee(request):
	try:
		if request.method == 'POST':
			data = request.POST
			emp_id = data.get('id')
			firstName = data.get('firstName')
			lastName = data.get('lastName')
			dob = data.get('dob')
			address = data.get('address')
			city = data.get('city')
			pin_code = data.get('pin_code')
			state = data.get('state')
			email = data.get('email')
			mobile = data.get('mobile')
			card_number = data.get('card_number')
			designation = data.get('designation')
		else:
			status = 'Success'
			message = 'But no data'

		try:
			employee_obj = Employee.objects.get(id=emp_id)
			employee_obj.firstName = firstName;
			employee_obj.lastName  = lastName;
			employee_obj.dob 	   = dob;
			employee_obj.address = address;
			employee_obj.city = city;
			employee_obj.pin_code = pin_code;
			employee_obj.state = state;
			employee_obj.email = email;
			employee_obj.mobile = mobile;
			employee_obj.card_number = card_number;

			employee_obj.save()

			message = "Employee updated Successfully"
			status = "success"
		except Exception as e:
			print e
			message = "Not updated"
			status = "failed"
	except Exception as e:
		print e
		message = "Not updated"
		status = "failed"

	return JsonResponse({"Status":status, "Message":message})

@csrf_exempt
def removeEmployee(request):
	try:
		employee_data = json.loads(request.read())
		emp_id = employee_data['id']
		employee_obj = Employee.objects.get(id=emp_id)
		employee_obj.delete()
		message = "Employee deleted Successfully"
		status = "success"
	except Exception as e:
		print e
		message = "Not deleted"
		status = "failed"

	return JsonResponse({"Status":status, "Message":message})
		


     



