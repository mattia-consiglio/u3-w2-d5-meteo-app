import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MeteoIcons from './MeteoIcons'
import LoadingErrorState from './LoadingErrorState'
import api from '../api'
import { formatTemp } from '../utils'

function HourlyWeather({ search }) {
	const [result, setResult] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	useEffect(() => {
		if (search !== '') {
			setError(false)
			setLoading(true)
			const fetchData = async () => {
				const result = await api(0, 1, { q: search })
				if (result.status === 'error' || parseInt(result.data.cod) !== 200) {
					setError(true)
				} else {
					console.log(result.data)
					setResult(result.data)
				}
				setLoading(false)
			}
			fetchData()
		}
	}, [search])

	return (
		<>
			<LoadingErrorState loading={loading} error={error} />
			{!loading && !error && (
				<Container className='mt-4 overflow-x-auto'>
					<Row className='align-items-center oveflow-auto flex-nowrap column-gap-4 p-4'>
						{result.list
							.filter(item => item.dt_txt.includes(new Date().toISOString().split('T')[0]))
							.map(item => (
								<Col
									xs={6}
									md={3}
									xl={2}
									className='mt-4 text-center section d-flex flex-column align-items-center'
									key={item.dt}
								>
									<p>
										{item.dt_txt.split(' ')[1].split(':')[0]}:
										{item.dt_txt.split(' ')[1].split(':')[1]}
									</p>
									<div style={{ width: '50%' }}>
										<MeteoIcons code={item.weather[0].icon} />
									</div>
									<h1 className='display-5 fw-bold'>{formatTemp(item.main.temp)}°</h1>
								</Col>
							))}
					</Row>
				</Container>
			)}
		</>
	)
}

export default HourlyWeather
