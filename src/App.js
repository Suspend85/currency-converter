import React, { useEffect, useState } from 'react';
import './App.css';

const App = (props) => {
	const [currentPrice, setPrice] = useState('0');
	const [valueFromInput, setValueFromInput] = useState('');
	const [data, setData] = useState([]);

const objCurrencies = [
		{
			ID: 'R01235',
			NumCode: '840',
			CharCode: 'USD',
			Nominal: 1,
			Name: 'Доллар США',
			Value: 58.3895,
			Previous: 60.2282,
		},
		{
			ID: 'R01239',
			NumCode: '978',
			CharCode: 'EUR',
			Nominal: 1,
			Name: 'Евро',
			Value: 62.0934,
			Previous: 63.938,
		},
		{
			ID: 'R01010',
			NumCode: '036',
			CharCode: 'AUD',
			Nominal: 1,
			Name: 'Австралийский доллар',
			Value: 41.9003,
			Previous: 43.3763,
		},
		{
			ID: 'R01060',
			NumCode: '051',
			CharCode: 'AMD',
			Nominal: 100,
			Name: 'Армянских драмов',
			Value: 13.6792,
			Previous: 13.9809,
		},
	];

	useEffect(() => {
		const getRequest = async () => {
			const request = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
			const response = await request.json();
			setData(response);
			console.log(response);
		};
		getRequest();
	}, []);

	const Convert = (e) => {
		// const nameCurrency = e.target.getAttribute('curr');
		const nameCurrency = document.getElementById('menu1').value;
		const currentValue = data.Valute[nameCurrency].Value;
		const valuteName = data.Valute[nameCurrency].Name;
		const conversion = (valueFromInput / currentValue).toFixed(2);
		setPrice(`${conversion} ${valuteName}`);
	};

	return (
		<div className="app">
			<div className="counter">{currentPrice}</div>
			<div className="value-input">
				<input
					type="number"
					className="form-control"
					placeholder="Write the amount in RUB"
					onChange={(e) => setValueFromInput(+e.target.value)}
				/>РУБ.
				<br />
			</div>
			<div className="select-curr">
				<select type="text" id="menu1" onChange={(e) => Convert(e)}>
					<option value={''}>Check the Currency</option>
					{objCurrencies.map(({ CharCode, Name, ID }) => {
						return (
							<option key={ID} curr={CharCode} value={CharCode}>
								{CharCode} {Name}
							</option>
						);
					})}
				</select>
				{/* <p>текущий курс: {}</p> */}
			</div>
		</div>
	);
};

export default App;
