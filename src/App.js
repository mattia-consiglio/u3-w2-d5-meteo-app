import './App.scss'
import React, { useState } from 'react'

import Searchbar from './Components/Searchbar'
import CurrentWeather from './Components/CurrentWeather'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HourlyWeather from './Components/HourlyWeather'

function App() {
	const [lastSearch, setLastSearch] = useState('') //1
	const [meteoColor, setMeteoColor] = useState('white') //2
	const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 }) //3
	const [openDropdown, setDropdownOpen] = useState(false) //4

	return (
		<div
			className={'App ' + meteoColor}
			onClick={e => {
				if (!e.target.closest('#dropdow') && !e.target.closest('#search')) {
					setDropdownOpen(false)
				}
			}}
		>
			<header>
				<Searchbar
					lastSearch={lastSearch}
					setLastSearch={setLastSearch}
					setCoordinates={setCoordinates}
					openDropdown={openDropdown}
					setDropdownOpen={setDropdownOpen}
				/>
			</header>
			<main>
				<CurrentWeather coordinates={coordinates} setMeteoColor={setMeteoColor} />
				<HourlyWeather coordinates={coordinates} />
			</main>
			<footer></footer>
		</div>
	)
}

export default App
