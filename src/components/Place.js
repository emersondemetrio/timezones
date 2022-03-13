import { memo, useEffect, useState } from 'react';
import { getWeatherOf } from '../services/weatherapi';
import Weather from './Weather';

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

const openPlace = (city) =>
	window.open(`https://news.google.com/topstories?q=${encodeURI(city)}`);

const Loading = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		style={{
			display: 'block',
			shapeRendering: 'auto',
		}}
		width="40px"
		height="40px"
		viewBox="0 0 100 100"
		preserveAspectRatio="xMidYMid"
	>
		<circle
			cx="50"
			cy="50"
			r="32"
			strokeWidth="8"
			stroke="#0a0a0a"
			strokeDasharray="50.26548245743669 50.26548245743669"
			fill="none"
			strokeLinecap="round"
		>
			<animateTransform
				attributeName="transform"
				type="rotate"
				repeatCount="indefinite"
				dur="1s"
				keyTimes="0;1"
				values="0 50 50;360 50 50"
			></animateTransform>
		</circle>
	</svg>
);

const Place = ({ name, timeZone, city }) => {
	const [tz, setTz] = useState(formatDate(timeZone, new Date()));
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setTz(formatDate(timeZone, new Date()));
		}, 1000);

		return () => clearInterval(interval);
	}, [timeZone]);

	const getWeather = async () => {
		setLoading(true);
		setWeather(await getWeatherOf(city));
		setLoading(false);
	};

	useEffect(() => {
		getWeather();
	}, []);

	return (
		<div className="card">
			<h3>{name}</h3>
			<h4>{tz}</h4>
			<div className="info">{loading && <Loading />}</div>

			{weather && !loading && (
				<Weather
					condition={weather.current.condition}
					temperature={weather.current.temp_c}
					feelsLike={weather.current.feelslike_c}
					onUpdate={getWeather}
					onOpenInfo={() => openPlace(city)}
				/>
			)}
		</div>
	);
};

export default memo(Place);
