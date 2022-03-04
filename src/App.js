import { useEffect, useState } from 'react';
import './App.css';
import timeZones from './TIMEZONES.json';

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

const Folks = ({ list }) => {
	return (
		<ul>
			{list.map((l) => (
				<li key={l}>{l}</li>
			))}
		</ul>
	);
};

const TimeZone = ({ name, timeZone, folks }) => {
	const [tz, setTz] = useState(formatDate(timeZone, new Date()));

	useEffect(() => {
		const interval = setInterval(() => {
			setTz(formatDate(timeZone, new Date()));
		}, 1000);

		return () => clearInterval(interval);
	}, [timeZone]);

	return (
		<div className="card">
			<h4>{name}</h4>
			<h4>{tz}</h4>
		</div>
	);
};

export const App = () => {
	return (
		<div className="App">
			<h3>Timezones</h3>
			<div className="main-container">
				{timeZones.map((t) => (
					<TimeZone {...t} key={t.timeZone} />
				))}
			</div>
		</div>
	);
};
