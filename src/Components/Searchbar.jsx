import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { FaSearch } from 'react-icons/fa'
import api from '../api'

/**
 * Searchbar component that handles searching for a city.
 * Allows user to enter a search query and submit it.
 * Maintains search state and triggers search on submit.
 */
function Searchbar({ lastSearch, setLastSearch }) {
	const [value, setValue] = useState('') //1
	const [result, setResult] = useState([]) //2
	const [loading, setLoading] = useState(true) //3
	const [error, setError] = useState(false) //4
	const [errorMsg, setErrorMsg] = useState('') //5
	const [openDropdown, setDropdownOpen] = useState(false) //6

	const startQuery = e => {
		e.preventDefault()
		if (value.length > 0 && lastSearch !== value) {
			setLastSearch(value)
		}
	}

	useEffect(() => {
		setError(false)
		setLoading(true)
		const fetchData = async () => {
			const result = await api(1, 0, { q: value, limit: 5 })
			console.log(result)
			if (result.status === 'error') {
				setError(true)
			} else {
				console.log(result.data)
				setResult(result.data)
			}
			setLoading(false)
		}
		fetchData()
	}, [value])

	return (
		<Container>
			<Row>
				<Col className='mt-4 d-flex'>
					<div className='w-100'>
						<Form.Control
							size='lg'
							type='search'
							placeholder='Cerca una città'
							value={value}
							onChange={e => setValue(e.target.value)}
							onKeyUp={e => {
								if (e.key === 'Enter') {
									e.preventDefault()
									startQuery(e)
								}
							}}
							onFocus={e => setDropdownOpen(true)}
							onBlur={e => {
								if (value.length === 0) {
									setValue(lastSearch)
								}
								setDropdownOpen(false)
							}}
							className='text-center fw-bold'
						/>
						<ListGroup>
							{(loading || error) && (
								<ListGroup.Item>
									{loading && 'Caricamento...'}
									{error && errorMsg}
								</ListGroup.Item>
							)}

							{!loading &&
								!error &&
								result.map(item => (
									<ListGroup.Item
										key={item.lat + item.long}
										onClick={() =>
											setValue(
												item.local_names.myObj.hasOwnProperty('it')
													? item.local_names.it
													: item.name
											)
										}
									>
										{item.hasOwnProperty('local_names') && item.local_names.hasOwnProperty('it')
											? item.local_names.it
											: item.name}
										, {item.country}, {item.state}
									</ListGroup.Item>
								))}
						</ListGroup>
					</div>
					<Button variant='light' type='submit' onClick={startQuery} className='ms-3'>
						<FaSearch />
					</Button>
				</Col>
			</Row>
		</Container>
	)
}

export default Searchbar
