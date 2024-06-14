import React from 'react';
import { useLocation } from 'react-router-dom';
import './ResultsPage.css';

function ResultsPage() {
	const location = useLocation();
	const { analysisData } = location.state || {};
	console.log(
		analysisData.history_data.Close[analysisData.history_data.Close.length - 1]
	);
	return (
		<body>
			<div className="result-page">
				<div className="left-section-result-page ">
					<h1>
						Stock Analysis: {analysisData?.company_name} (
						{(analysisData?.ticker || '').toUpperCase()})
					</h1>
					{analysisData ? (
						<>
							<p>
								Percentage Change:
								<span
									style={{
										color:
											analysisData.change > 0
												? 'green'
												: analysisData.change < 0
												? 'red'
												: '#2c3639',
									}}
								>
									{analysisData.change > 0
										? `+${analysisData.change}%`
										: `${analysisData.change}%`}
								</span>
							</p>
							<p>
								Stocks held: {analysisData.shares}, Value at Open of day 1:{' '}
								{(
									analysisData.shares * analysisData.history_data.Open[0]
								).toFixed(2)}
								<br />
								<br />
								Stock value at Close of last day:{' '}
								{(
									analysisData.shares *
									analysisData.history_data.Close[
										analysisData.history_data.Close.length - 1
									]
								).toFixed(2)}
								<br />
								<br />
								Profit/Loss:
								<span
									style={{
										color:
											analysisData.shares *
												analysisData.history_data.Close[
													analysisData.history_data.Close.length - 1
												] -
												analysisData.shares *
													analysisData.history_data.Open[0] >
											0
												? 'green'
												: analysisData.shares *
														analysisData.history_data.Close[
															analysisData.history_data.Close.length - 1
														] -
														analysisData.shares *
															analysisData.history_data.Open[0] <
												  0
												? 'red'
												: 'black',
									}}
								>
									{(
										analysisData.shares *
											analysisData.history_data.Close[
												analysisData.history_data.Close.length - 1
											] -
										analysisData.shares * analysisData.history_data.Open[0]
									).toFixed(2)}
									$
								</span>
							</p>
							<h2>Historical Data (Period: {analysisData.period})</h2>
							{analysisData.history_data?.Close?.length > 0 && ( // Check if Close data exists
								<div className="table-container">
									<table>
										{/* Table header row */}
										<thead>
											<tr>
												<th className="table-header">Date</th>
												<th className="table-header">Open</th>
												<th className="table-header">Close</th>
												<th className="table-header">Low</th>
												<th className="table-header">High</th>
												<th className="table-header">Volume</th>
											</tr>
										</thead>

										{/* Table body rows */}
										<tbody>
											{analysisData.history_data.Close.map(
												(closeValue, index) => (
													<tr key={index}>
														<td>
															{analysisData.date?.[index]
																? new Date(
																		analysisData.date[index]
																  ).toLocaleDateString('en-US', {
																		year: 'numeric',
																		month: '2-digit',
																		day: '2-digit',
																  })
																: 'N/A'}
														</td>

														<td>
															{analysisData.history_data.Open?.[index] !==
															undefined
																? analysisData.history_data.Open[index].toFixed(
																		2
																  )
																: 'N/A'}
														</td>
														<td>{closeValue.toFixed(2)}</td>
														<td>
															{analysisData.history_data.Low?.[index] !==
															undefined
																? analysisData.history_data.Low[index].toFixed(
																		2
																  )
																: 'N/A'}
														</td>
														<td>
															{analysisData.history_data.High?.[index] !==
															undefined
																? analysisData.history_data.High[index].toFixed(
																		2
																  )
																: 'N/A'}
														</td>
														<td>{analysisData.history_data.Volume?.[index]}</td>
													</tr>
												)
											)}
										</tbody>
									</table>
								</div>
							)}
							{!analysisData.history_data && (
								<p>No historical data available.</p>
							)}
						</>
					) : (
						<p>No data available for this ticker or period.</p>
					)}
				</div>
			</div>
			<div className="right-section-result-page ">
				<img src=".\dollarPic.jpg" alt="Image description" />
			</div>
		</body>
	);
}

export default ResultsPage;
