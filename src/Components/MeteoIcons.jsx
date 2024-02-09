import React from 'react'
import {
	WiDaySunny,
	WiDayCloudy,
	WiCloud,
	WiCloudy,
	WiRain,
	WiDayRain,
	WiThunderstorm,
	WiSnow,
	WiDayFog,
	WiNightClear,
	WiNightCloudy,
	WiNightRain,
	WiNightFog,
} from 'react-icons/wi'

function MeteoIcons({ code }) {
	const codeMap = {
		'01d': <WiDaySunny />,
		'02d': <WiDayCloudy />,
		'03d': <WiCloud />,
		'04d': <WiCloudy />,
		'09d': <WiRain />,
		'10d': <WiDayRain />,
		'11d': <WiThunderstorm />,
		'13d': <WiSnow />,
		'50d': <WiDayFog />,
		'01n': <WiNightClear />,
		'02n': <WiNightCloudy />,
		'03n': <WiCloud />,
		'04n': <WiCloudy />,
		'09n': <WiRain />,
		'10n': <WiNightRain />,
		'11n': <WiThunderstorm />,
		'13n': <WiSnow />,
		'50n': <WiNightFog />,
	}
	return <div className='main-weather-icon'>{codeMap[code]}</div>
}

export default MeteoIcons
