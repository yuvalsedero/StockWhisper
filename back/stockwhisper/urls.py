from django.urls import path
from . import views  # Import the views file again

urlpatterns = [
    path('analyze/', views.analyze_stock, name='analyze_stock'),  # Assuming your function is named analyze_stock
]
