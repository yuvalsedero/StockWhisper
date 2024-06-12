import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
	const [tickerSymbol, setTickerSymbol] = useState('');
	const [SharesNumber, setSharesNumber] = useState(0);
	const [period, setPeriod] = useState('1d');
	const [analysisData, setAnalysisData] = useState(null); // State to store analysis data
	const [errorMessage, setErrorMessage] = useState(''); // State to store error message
	const navigate = useNavigate();

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		if (name === 'tickerSymbol') {
			setTickerSymbol(value);
		} else if (name === 'SharesNumber') {
			// Convert value to a number (handle potential non-numeric input)
			const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
			setSharesNumber(isNaN(numericValue) ? '' : numericValue); // Set empty string if not a number
		} else if (name === 'period') {
			setPeriod(value);
		}
	};

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setErrorMessage(''); // Clear any previous error message
		setIsLoading(true);
		try {
			const response = await fetch(
				'https://stockwhisper-api.onrender.com/analyze/',
				{
					method: 'POST',
					body: JSON.stringify({ ticker: tickerSymbol, period, SharesNumber }),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				throw new Error(`API call failed with status ${response.status}`);
			}

			const responseData = await response.json(); // Parse JSON response

			setAnalysisData(responseData); // Update state with actual analysis data from backend
		} catch (error) {
			console.error('Error analyzing stock:', error);
			// Handle errors appropriately - set a user-friendly error message
			setErrorMessage('Please enter a valid stock ticker.');
		} finally {
			setIsLoading(false);
		}

		// Navigation can still happen after error handling
		if (analysisData) {
			navigate('/results', { state: { ticker: tickerSymbol, analysisData } });
		}
	};

	// Navigate after state update (conditional to prevent unnecessary navigations)
	useEffect(() => {
		if (analysisData) {
			navigate('/results', { state: { ticker: tickerSymbol, analysisData } });
		}
	}, [analysisData, navigate]);

	return (
		<div className="home-page">
			<h1>Stock Analysis</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="ticker">Stock Ticker Symbol:</label>
				<input
					type="text"
					id="ticker"
					name="tickerSymbol"
					value={tickerSymbol}
					onChange={handleInputChange}
					required
					className={errorMessage ? 'error-input' : ''} // Add error class if needed
				/>
				<label htmlFor="shares">Shares amount:</label>
				<input
					type="number"
					id="shares"
					name="SharesNumber"
					value={SharesNumber}
					onChange={handleInputChange}
					required
					className={errorMessage ? 'error-input' : ''} // Add error class if needed
				/>
				<br />
				<label htmlFor="period">Period:</label>
				<select
					id="period"
					name="period"
					value={period}
					onChange={handleInputChange}
				>
					<option value="1d">1 Day</option>
					<option value="5d">5 Days</option>
					<option value="1mo">1 Month</option>
					<option value="3mo">3 Months</option>
					<option value="6mo">6 Months</option>
					<option value="1y">1 Year</option>
					<option value="ytd">Year to Date</option>
				</select>
				<br />
				<button type="submit" disabled={isLoading}>
					{isLoading ? 'Analyzing...' : 'Analyze'}
				</button>
			</form>
			{errorMessage && ( // Conditionally render error message in red, positioned below button
				<span className="error-message" style={{ color: 'red' }}>
					{errorMessage}
				</span>
			)}
		</div>
	);
}

export default HomePage;
