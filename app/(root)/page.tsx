import Dashboard from './Dashboard';
import styles from './page.module.css';

const getIntroduction = () => {
	const hour = new Date().getHours();

	if (hour >= 21) {
		return 'Good night';
	}

	if (hour >= 18) {
		return 'Good evening';
	}

	if (hour >= 12) {
		return 'Good afternoon';
	}

	return 'Good morning';
};

const getColors = () => {
	const colors = [
		{ start: '#74b8e8', end: '#5234eb' },
		{ start: '#74b8e8', end: '#6195ba' },
		{ start: '#aa0000', end: '#880000' },
		{ start: '#e67ec5', end: '#a64e8a' },
	];

	return colors[Math.floor(Math.random() * colors.length)];
};

const Page: React.FC = () => {
	const colors = getColors();

	return (
		<div className={'full center ' + styles.home}>
			<h2 className='center-text'>{getIntroduction()} Tim</h2>
			<Dashboard />
			<svg viewBox='0 0 1800 1800' width='80vw' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<circle cx='900' cy='900' r='900' fill='url(#circle)'></circle>
				<defs>
					<radialGradient id='circle' cx='0' cy='0' r='1'>
						<stop stopColor={colors.start} stopOpacity='0.5'></stop>
						<stop stopColor={colors.end} stopOpacity='0' offset='1'></stop>
					</radialGradient>
				</defs>
			</svg>
		</div>
	);
};
export default Page;
