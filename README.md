# Stock Analysis App with Django and React

https://stockwhisper.onrender.com/
Currently deployed on Render site. Takes the server a minute to load the first request.

Description:

This project is a web application built with Django (backend) and React (frontend) that allows users to analyze stock performance over a chosen time period. It combines the strengths of both frameworks to provide an interactive and informative stock analysis experience.

**Features:**

- **Stock information retrieval:** Enter a stock ticker symbol and get historical data about the stock price.
- **Time period selection:** Choose the desired timeframe (e.g., daily, weekly, monthly) for data analysis.
- **Profit/loss calculation:** Simulate a stock purchase at the beginning of the period and calculate potential profit or loss based on the closing price at the end.
- **Interactive interface:** Enjoy a user-friendly and responsive React interface for a seamless user experience.

**Technologies:**

- Programming languages: Python (Django) and JavaScript (React)
- Frameworks: Django (backend), React (frontend)
- Additional libraries (consider listing any specific libraries used, e.g., Django REST framework for API handling)

**Installation:**

1. **Clone the repository:**
   bash
   git clone [https://github.com/](https://github.com/)<your-username>/stock-analysis-app.git
2. **Create a virtual environment (recommended):**
   Refer to official Django or React documentation for specific instructions.
3. **Install dependencies:**
   on bash:
  pip install -r requirements.txt  # For backend dependencies
  cd frontend && npm install        # For frontend dependencies
4. **Run database migrations (Django):**
   on bash:
   python manage.py migrate
5. **Set up environment variables:**
  -Create a .env file in the project root directory (ignore this file with Git) to store sensitive settings like API keys.
  -Configure Django and any other libraries to read from these variables.
6. **Run the development server:**
   Start the Django server:
   on bash:
   python manage.py runserver
   
   Start the React development server (in a separate terminal):
   on bash:
   cd frontend && npm start

**credits to yfinance library**

project by Yuval Sedero
   
