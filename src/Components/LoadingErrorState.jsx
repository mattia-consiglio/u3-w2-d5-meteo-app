import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function LoadingErrorState({ loading, error, errorMsg }) {
	return (
		(loading || error) && (
			<Container>
				<Row className='section'>
					<Col className='mt-4'></Col>
					{loading && <p>Loading...</p>}
					{error && <p>{errorMsg}</p>}
				</Row>
			</Container>
		)
	)
}

export default LoadingErrorState
