import yfinance as yf
import datetime

def get_percentage_change(ticker, period):
    try:
        # Fetch historical data
        # historical_data = ticker.history(period=period)
        history_data = yf.download(ticker.info['symbol'], period= period)
        company_name = ticker.info['shortName']
        dates = history_data.index
      
        # print(download_data)
        # Handle missing values (optional)
        history_data.fillna(method='ffill', inplace=True)
        # print(history_data.index)
        # Check for valid closing prices (optional)
        if not all(history_data['Close'].notna()):
            return {ticker: {'error': 'Missing closing prices in data'}}
        
        pct_change = round(((history_data['Close'].iloc[-1] - history_data['Close'].iloc[0]) / history_data['Close'].iloc[0]) * 100, 2)
        # Extract relevant data
        return {
            'ticker': ticker,
            'company_name': company_name,
            'change': pct_change,
            'close': round(history_data['Close'].iloc[-1], 2),
            'period': period,
            'history_data': history_data,
            'date': dates
        }

    except (KeyError, yf.DownloadError) as e:
        return {ticker: {'error': str(e)}}
