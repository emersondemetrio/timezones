import Place from './components/Place';
import places from './PLACES.json';

export const App = () => {
	return (
		<div className="App">
			<header>
				<h3>Time Zones</h3>
			</header>

			<div className="row">
				{places.map((t) => (
					<Place {...t} key={t.timeZone} />
				))}
			</div>
		</div>
	);
};
