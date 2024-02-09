import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MeteoIcons from './MeteoIcons'
import LoadingErrorState from './LoadingErrorState'
import api from '../api'
import { formatTemp, getDay } from '../utils'

function NextDaysWeather() {
	const [result, setResult] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [errorMsg, setErrorMsg] = useState('')

	return (
		<>
			<LoadingErrorState loading={loading} error={error} errorMsg={errorMsg} />
			{!loading && !error && (
				<Container className='mt-4'>
					<Row className='justify-content-center align-items-center text-center section p-4'>
						<Col xs={12}>
							<p className='fw-medium m-0 '>{getDay(result.dt).toLocaleUpperCase()}</p>
						</Col>
						<Col xs={6} md={4}>
							<h1 className='display-1 fw-bold'>{formatTemp(result.main.temp)}°</h1>
							<p>
								Min: {formatTemp(result.main.temp_min)}°C - Max: {formatTemp(result.main.temp_max)}
								°C{' '}
							</p>
							<p>{result.weather[0].description}</p>
						</Col>
						<Col xs={6} md={4} lg={2}>
							<MeteoIcons code={result.weather[0].icon} />
						</Col>
					</Row>
				</Container>
			)}
		</>
	)
}

export default NextDaysWeather
