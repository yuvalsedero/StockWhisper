from django.db import models
import yfinance as yf
import json

class Stock(models.Model):
  ticker = models.CharField(max_length=10)
  company_name = models.CharField(max_length=255, default='')
  current_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
  change = models.DecimalField(max_digits=10, decimal_places=2, null=True)
  period = models.CharField(max_length=10,)  # Field for storing period
  history_data = models.JSONField(blank=True, default='{}')  # Empty JSON object as default
  # Timestamps for data updates
  last_updated = models.DateTimeField(auto_now=True)  # Automatically updates on save

  def __str__(self):
    return f"{self.ticker} - {self.company_name}"
