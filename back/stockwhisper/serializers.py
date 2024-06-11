from rest_framework import serializers
from .models import Stock

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ('ticker', 'company_name', 'current_price', 'change', 'period', 'history_data')
        required = ('ticker', 'period')  # Only ticker and period are required
