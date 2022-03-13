import './App.css';
import Place from './components/Place';
import places from './PLACES.json';

export const App = () => {
	return (
		<div className="App">
			<h3>Timezones</h3>
			<div className="main-container">
				{places.map((t) => (
					<Place {...t} key={t.timeZone} />
				))}
			</div>
		</div>
	);
};
