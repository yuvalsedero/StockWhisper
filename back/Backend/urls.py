from django.contrib import admin
from django.urls import path, include



# No need for routers here
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('stockwhisper.urls')),  # Include the urls from your app
    path("__debug__/", include("debug_toolbar.urls")),
]
