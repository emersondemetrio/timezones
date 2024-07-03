import { memo, useMemo, useEffect, useState } from 'react';
import { getWeatherOf } from '../services/weatherapi';
import Weather from './Weather';
import { Loading } from './Loading';

const genericDateOptions = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
	hour12: false,
};

const formatDate = (timeZone, date) =>
	new Intl.DateTimeFormat('pt-BR', {
		...genericDateOptions,
		timeZone,
	}).format(date);

const getNewsURL = (city) =>
	`https://www.google.com/search?q=${encodeURI(city)}&source=lnms&tbm=nws`;

const isCurrentLocalTimeZone = (timeZone) =>
	Intl.DateTimeFormat().resolvedOptions().timeZone === timeZone;

const Place = ({ name, timeZone, city }) => {
	const highlighted = isCurrentLocalTimeZone(timeZone);
	const dateDiffInHours = useMemo(
		() =>
			new Date(
				new Date().toLocaleString('en-US', {
					timeZone,
				})
			).getHours() - new Date().getHours(),
		[timeZone]
	);

	const [tz, setTz] = useState(formatDate(timeZone, new Date()));
	const [weather, setWeather] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setTz(formatDate(timeZone, new Date()));
		}, 1000);

		return () => clearInterval(interval);
	}, [timeZone]);

	const getWeather = async () => {
		setLoading(true);
		try {
			setWeather(await getWeatherOf(city));
		} catch (error) {
			console.info(error);
			setError(true);
		}
		setLoading(false);
	};

	useEffect(() => {
		getWeather();
	}, []);

	return (
		<div className={`place ${highlighted ? 'highlighted' : ''}`}>
			<h3>{name}</h3>
			<h3>
				{tz}
				{!highlighted && (
					<span className="date-diff" data-content={dateDiffInHours}>
						{' '}
						({dateDiffInHours})
					</span>
				)}
			</h3>

			{loading && (
				<div className="info">
					<Loading />
				</div>
			)}
			{error && (
				<div className="info">
					<p>Unable to get weather info</p>
					<button
						style={{
							border: 'solid 1px #ddd',
							padding: 10,
						}}
						onClick={getWeather}
					>
						Try again
					</button>
				</div>
			)}

			{!loading && !error && weather && (
				<Weather
					condition={weather.current.condition}
					temperature={weather.current.temp_c}
					feelsLike={weather.current.feelslike_c}
					newsURL={getNewsURL(city)}
					onUpdate={getWeather}
				/>
			)}
		</div>
	);
};

export default memo(Place);
