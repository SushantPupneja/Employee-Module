from django.conf.urls import url,include
from .views import AnalyticsData

urlpatterns = [
    url(r'^api/AnalyticsData', AnalyticsData ,name="AnalyticsData")
] 