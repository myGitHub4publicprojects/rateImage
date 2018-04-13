from django.conf.urls import url
from django.contrib import admin
from rate import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.HomeView.as_view(), name='home'),
    url(r'^(?P<pk>[0-9]+)$', views.edit, name='edit'),
]
