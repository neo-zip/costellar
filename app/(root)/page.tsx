'use client';

import Dashboard from './Dashboard';
import Nav from './Nav';
import styles from './page.module.css';
import useColor from '../../components/hooks/useColor';
import Confetti from 'react-confetti';
import { useViewportSize } from '@mantine/hooks';
import { useContext } from 'react';
import { IdeasContext } from '@/providers/Ideas';
import Loader from '@/components/loader/Loader';
import { UserContext } from '@/providers/User';
import { notifications } from '@mantine/notifications';

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

const Page: React.FC = () => {
	const { user, updateUser } = useContext(UserContext);
	const { ideas } = useContext(IdeasContext);
	const { colors, fetchNewColor } = useColor();
	const { height, width } = useViewportSize();

	if (!user || !ideas) {
		return <Loader />;
	}

	return (
		<div className={'full center ' + styles.home}>
			{user.setupComplete ? (
				<>
					{ideas
						.filter((idea) => idea.completed)
						.map((_, i) => {
							return <Confetti key={i} height={height} width={width} recycle={false} />;
						})}
					<Nav changeColor={fetchNewColor} />
					<h2 className='center-text'>
						{getIntroduction()} {user.name}
					</h2>
					<Dashboard />
				</>
			) : (
				<>
					<h2>Costellar</h2>
					<form
						className='center-text flex-col flex-gap'
						action={(query: any) => {
							const input = query.get('name');

							if (input.length < 1 || input.length > 100) {
								notifications.show({ title: 'Sorry!', message: 'Please provide 1-100 letters for your name.' });
								return;
							}

							updateUser({
								...user,
								name: input,
								setupComplete: true,
							});

							notifications.show({
								title: 'Woohoo',
								message: 'Your all done and ready to add some ideas!',
							});
						}}>
						<h3 style={{ marginBottom: 15 }}>Let&apos;s set you up</h3>
						<input className='input' placeholder='Your name...' name='name' />
						<button className='btn'>All Done</button>
					</form>
				</>
			)}
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
