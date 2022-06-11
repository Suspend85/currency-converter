import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col, FloatingLabel } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './App.css';

const App = () => {
	const [currentPrice, setPrice] = useState('0');
	const [valueFromInput, setValueFromInput] = useState('');
	const [data, setData] = useState([]);

	let newArr = [];

	for (let value in data.Valute) {
		newArr.push(data.Valute[value]);
	}

	const getRequest = async () => {
		const request = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
		const response = await request.json();
		setData(response);
	};

	useEffect(() => {
		getRequest();
	}, []);

	const Convert = () => {
		const menu = document.getElementById('menu').value;
		let nameCurrency;
		if (!menu) {
			return;
		} else {
			nameCurrency = menu;
		}
		const currentValue = data.Valute[nameCurrency].Value;
		const valuteName = data.Valute[nameCurrency].Name;
		const conversion = Number((valueFromInput / currentValue).toFixed(2)).toLocaleString('ru');

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
								e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
								setValueFromInput(String(e.target.value).replace(/\s/g, ''));
							}}
							onKeyUp={Convert}
							controlId="floatingInputGrid"
							label="Write the amount in RUB">
							<Form.Control type="text" placeholder="Write the amount in RUB" />
						</FloatingLabel>
					</Col>
					<Col md>
						<FloatingLabel controlId="floatingSelectGrid" label="Check the Currency">
							<Form.Select onChange={Convert} id="menu" aria-label="Check the Currency">
								<option value={''}>Open this select menu</option>
								{newArr.map(({ CharCode, ID, Name }, i) => {
									return (
										<option key={ID} value={CharCode}>
											{i + 1}. {CharCode} - {Name}
										</option>
									);
								})}
							</Form.Select>
						</FloatingLabel>
					</Col>
				</Row>
			</div>
		</Container>
	);
};

export default App;
