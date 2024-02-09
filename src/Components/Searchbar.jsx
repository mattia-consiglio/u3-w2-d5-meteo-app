import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { FaLocationCrosshairs } from 'react-icons/fa6'
import api from '../api'

/**
 * Searchbar component that handles searching for a city.
 * Allows user to enter a search query and submit it.
 * Maintains search state and triggers search on submit.
 */
function Searchbar({ lastSearch, setLastSearch, setCoordinates, openDropdown, setDropdownOpen }) {
	const [value, setValue] = useState('') //1
	const [result, setResult] = useState([]) //2
	const [loading, setLoading] = useState(true) //3
	const [error, setError] = useState(false) //4
	const [errorMsg, setErrorMsg] = useState('') //5
	const searchDelay = 700

	const startQuery = e => {
		e.preventDefault()
		if (value.length > 0 && lastSearch !== value) {
			setLastSearch(value)
		}
	}

	const getGeolocation = async () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const { latitude, longitude } = position.coords
					setCoordinates({ lat: latitude, lon: longitude })
					const fetchData = async () => {
						const result = await api(1, 1, { lat: latitude, lon: longitude, limit: 1 })
						console.log(result)
						if (result.status === 'error') {
							setError(true)
							setErrorMsg(result.data.message)
						} else {
							console.log(result)
							const city =
								result.data[0].hasOwnProperty('local_names') &&
								result.data[0].local_names.hasOwnProperty('it')
									? result.data[0].local_names.it
									: result.data[0].name
							setValue(city)
						}
					}
					fetchData()
				},
				error => {
					console.log(error)
				},
				{
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0,
				}
			)
		} else {
			console.log('Geolocation is not supported by this browser.')
		}
	}

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setError(false)
			setLoading(true)
			const fetchData = async () => {
				const result = await api(1, 0, { q: value, limit: 5 })
				console.log(result)
				if (result.status === 'error') {
					setError(true)
					setErrorMsg(result.data.message)
				} else {
					console.log(result.data)
					setResult(result.data)
				}
				setLoading(false)
			}
			fetchData()
		}, searchDelay)

		return () => clearTimeout(timeoutId)
	}, [value, searchDelay])

	return (
		<Container>
			<Row>
				<Col className='mt-4 d-flex'>
					<div className='w-100'>
						<Form.Control
							id='search'
							size='lg'
							type='search'
							placeholder='Cerca una città'
							value={value}
							onChange={e => {
								setValue(e.target.value)
								if (e.target.value.length === 0) {
									setDropdownOpen(false)
								} else {
									setDropdownOpen(true)
								}
							}}
							onKeyUp={e => {
								if (e.key === 'Enter') {
									e.preventDefault()
									startQuery(e)
								}
							}}
							onFocus={e => {
								if (value.length > 0) {
									setDropdownOpen(true)
								}
							}}
							onBlur={e => {
								if (value.length === 0) {
									setValue(lastSearch)
								}
							}}
							className='text-center fw-bold'
						/>
						<div className='position-relative'>
							<ListGroup
								className={`position-absolute w-100 ${!openDropdown && 'd-none'}`}
								id='dropdown'
							>
								{(loading || error) && (
									<ListGroup.Item>
										{loading && 'Caricamento...'}
										{error && errorMsg}
									</ListGroup.Item>
								)}
								{!loading &&
									!error &&
									result.map(item => {
										const city =
											item.hasOwnProperty('local_names') && item.local_names.hasOwnProperty('it')
												? item.local_names.it
												: item.name
										return (
											<ListGroup.Item
												key={item.lat + item.lon}
												onClick={() => {
													setValue(city)
													console.log(item)
													setCoordinates({ lat: item.lat, lon: item.lon })
													setLastSearch(city)
													setDropdownOpen(false)
												}}
												action
											>
												{city}, {item.country}, {item.state}
											</ListGroup.Item>
										)
									})}
							</ListGroup>
						</div>
					</div>
					<Button variant='light' type='submit' onClick={getGeolocation} className='ms-3'>
						<FaLocationCrosshairs />
					</Button>
				</Col>
			</Row>
		</Container>
	)
}

export default Searchbar
