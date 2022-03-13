const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1/current.json';
const DEFAULT_PLACE = 'Florianópolis, Santa Catarina, Brasil';

export const getSearchString = (place) => {
	return `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
		place || DEFAULT_PLACE
	)}&aqi=yes`;
};

export const getWeatherOf = async (place) => {
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	return await fetch(getSearchString(place), options).then((d) => d.json());
};
