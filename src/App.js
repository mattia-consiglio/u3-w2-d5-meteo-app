import './App.scss'
import React, { useState } from 'react'

import Searchbar from './Components/Searchbar'
import CurrentWeather from './Components/CurrentWeather'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HourlyWeather from './Components/HourlyWeather'

function App() {
	const [lastSearch, setLastSearch] = useState('')
	const [meteoColor, setMeteoColor] = useState('white')
	const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 })

	return (
		<div className={'App ' + meteoColor}>
			<header>
				<Searchbar lastSearch={lastSearch} setLastSearch={setLastSearch} />
			</header>
			<main>
				<CurrentWeather search={lastSearch} setMeteoColor={setMeteoColor} />
				<HourlyWeather search={lastSearch} />
			</main>
			<footer></footer>
		</div>
	)
}

export default App
