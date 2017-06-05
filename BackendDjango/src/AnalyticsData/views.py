# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
import json
import os
# Create your views here.


# 52.37.151.97:9090/apis/darknetLogs

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

@csrf_exempt
def AnalyticsData(request):
	try:
		if request.method == "POST":

			date = request.POST.get("date")
			print date

			if date == "2017-04-19":
				file = "19.json";
			elif date == "2017-04-20":
				file = "20.json";
			elif date == "2017-04-21":
				file = "21.json"
			elif date == "2017-04-22":
				file = "22.json"
			elif date == "2017-04-23":
				file = "23.json"
			else:
				file = "19.json"

			with open(os.path.join(os.path.dirname(BASE_DIR), "static/json/" + file)) as json_data:
				data = json.load(json_data)
				print(data)
		
		else:
			file = "19.json"
			with open(os.path.join(os.path.dirname(BASE_DIR), "static/json/" + file)) as json_data:
				data = json.load(json_data)
				print(data)


	except Exception as e:
		print e
		data = []

	return JsonResponse({"data":data})
