import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FaSearch } from 'react-icons/fa'

function Searchbar({ lastSearch, setLastSearch }) {
	const [value, setValue] = useState('Bologna')

	const startQuery = e => {
		e.preventDefault()
		if (value.length > 0 && lastSearch !== value) {
			setLastSearch(value)
		}
	}

	return (
		<Container>
			<Row>
				<Col className='mt-4 d-flex'>
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
						onBlur={e => {
							if (value.length === 0) {
								setValue(lastSearch)
							}
						}}
						className='text-center fw-bold'
					/>
					<Button variant='light' type='submit' onClick={startQuery} className='ms-3'>
						<FaSearch />
					</Button>
				</Col>
			</Row>
		</Container>
	)
}

export default Searchbar
