from django.shortcuts import render  # Not strictly necessary for API views
import yfinance as yf
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Stock
from .serializers import StockSerializer
from .utils import get_percentage_change  # Import the function

@api_view(['POST'])
def analyze_stock (request):


    if request.method == 'POST':
        # Validate user-provided data (ticker and period
        ticker = request.data.get('ticker')
        period = request.data.get('period')
        shares = request.data.get('SharesNumber')
        if not ticker or not period:
            return Response({'error': 'Missing required fields: ticker and period'}, status=status.HTTP_400_BAD_REQUEST)


        try:

            # Fetch data using yfinance
            ticker_obj = yf.Ticker(ticker)
            # print(download_data) # For debugging purposes
            # company_name = ticker_obj.info['shortName']
            data_and_change = get_percentage_change(ticker_obj, period)
            # print(data_and_change)
            filtered_data = {
                              'ticker': ticker,
                              'company_name' : data_and_change['company_name'],
                              'current_price': data_and_change['close'],
                              'change': data_and_change['change'],
                              'period' : data_and_change['period'],
                              'history_data' : data_and_change['history_data'],
                              'date' : data_and_change['date'],
                              'shares' : shares
                            #   'shares_after_change' : shares * data_and_change['change'] * 100
                            }
            # Optional serializer validation (adjust based on your needs)
            serializer = StockSerializer(data=filtered_data)  # Pass fetched data for validation
            if serializer.is_valid():
                serializer.save()  # Save only if validation passes (optional)
            else:
                print("Serializer validation failed:", serializer.errors)  # Log for debugging

            # Return response (adjust data based on your needs)
            return Response(filtered_data , status=status.HTTP_200_OK)  # Return the analyzed data directly
        # except yf.DownloadError as e:
        #     return Response({'error': f"Error downloading data for {ticker}: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': 'Only POST requests are allowed for analysis'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
