import { memo } from 'react';
import { Info } from './Info';
import { Reload } from './Reload';

const Weather = ({ condition, temperature, feelsLike, onUpdate, newsURL }) => {
	const openNews = () => window.open(newsURL);

	return (
		<div className="place_inner">
			<h3>
				{condition.text}, {temperature}&deg;, Feels Like {feelsLike}
				&deg;
			</h3>

			<div className="place-info">
				<img
					className="condition-img"
					src={condition.icon}
					alt={condition.text}
				/>

				<button onClick={onUpdate}>
					<Reload />
				</button>

				<button onClick={openNews}>
					<Info />
				</button>
			</div>
		</div>
	);
};

export default memo(Weather);
