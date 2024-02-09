export const formatTemp = temp => {
	return temp.toFixed(1).toString().replace('.', ',')
}

export const getDay = date => {
	const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
	const dateObj = new Date(date)
	return days[dateObj.getDay()]
}
