from django.conf.urls import url,include
from .views import (
	addEmployee, 
	listEmployee, 
	editEmployee,
	removeEmployee
	)

urlpatterns = [
    url(r'^api/addemployee', addEmployee , name="addEmployee"),
    url(r'^api/listemployee', listEmployee , name="listEmployee"),
    url(r'^api/editemployee', editEmployee , name="listEmployee"),
    url(r'^api/removeEmployee', removeEmployee , name="listEmployee")
]