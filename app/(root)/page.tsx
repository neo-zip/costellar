import styles from './page.module.css';

const Page: React.FC = () => {
	return (
		<div className={'full center ' + styles.dashboard}>
			<h2 className='center-text'>You&apos;ve found a secret page!</h2>
			<div className={styles.grid}>
				<div className='outline'>hello</div>
				<button className='btn'>Login</button>
			</div>
			<svg viewBox='0 0 1800 1800' width='80vw' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<circle cx='900' cy='900' r='900' fill='url(#circle)'></circle>
				<defs>
					<radialGradient id='circle' cx='0' cy='0' r='1'>
						<stop stopColor='#a00' stopOpacity='0.5'></stop>
						<stop stopColor='#800' stopOpacity='0' offset='1'></stop>
					</radialGradient>
				</defs>
			</svg>
		</div>
	);
};
export default Page;
