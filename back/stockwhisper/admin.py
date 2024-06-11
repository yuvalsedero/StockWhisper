from django.contrib import admin
from .models import Stock

class StockAdmin(admin.ModelAdmin):
    list_display = ('ticker', 'company_name', 'current_price', 'change')
# Register your models here.
admin.site.register(Stock, StockAdmin)