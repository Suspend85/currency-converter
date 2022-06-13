import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col, FloatingLabel } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

import './App.css';

const App = () => {
	const [currentPrice, setPrice] = useState('0');
	const [inputValue, setInputValue] = useState('');
	const [response, setResponse] = useState([]);

	let currenciesArray = [];

	for (let value in response.Valute) {
		currenciesArray.push(response.Valute[value]);
	}

	const getRequest = () => {
		const _url = 'https://www.cbr-xml-daily.ru/daily_json.js';
		axios
			.get(_url)
			.then((response) => {
				return setResponse(response.data);
			})
			.catch((error) => console.log(error.code, error.message));
	};

	useEffect(() => {
		getRequest();
	}, []);

	const convert = () => {
		const currencyName = document.getElementById('menu').value;
		if (!currencyName) {
			return;
		}
		const currentValue = response.Valute[currencyName].Value;
		const valuteName = response.Valute[currencyName].Name;
		const conversion = Number((inputValue / currentValue).toFixed(2)).toLocaleString('ru');
		setPrice(`${conversion} ${valuteName}`);
	};

	return (
		<Container className="container" fluid="xl">
			<h2>Currency Converter</h2>
			<div className="counter">{currentPrice}</div>
			<div className="select-curr mt-3">
				<Row className="g-2">
					<Col md>
						<FloatingLabel
							onChange={(e) => {
								// wokr with integer numbers only
								e.target.value = new Intl.NumberFormat('ru-RU').format(e.target.value.replace(/[^\d]/g, ''));
								setInputValue(String(e.target.value).replace(/\s/g, ''));
							}}
							onKeyUp={convert}
							controlId="floatingInputGrid"
							label="Write the amount in RUB">
							<Form.Control type="text" placeholder="Write the amount in RUB" />
						</FloatingLabel>
					</Col>
					<Col md>
						<FloatingLabel controlId="floatingSelectGrid" label="Check the Currency">
							<Form.Select onChange={convert} id="menu" aria-label="Check the Currency">
								<option value={''}>Open this select menu</option>
								{currenciesArray.length > 0 ? (
									currenciesArray.map(({ CharCode, ID, Name }, i) => (
										<option key={ID} value={CharCode}>
											{i + 1}. {CharCode} - {Name}
										</option>
									))
								) : (
									<option value={''} disabled>
										There is no data!
									</option>
								)}
							</Form.Select>
						</FloatingLabel>
					</Col>
				</Row>
			</div>
		</Container>
	);
};

export default App;
