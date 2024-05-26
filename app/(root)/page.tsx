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
import { ThemeContext } from '@/providers/Theme';

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
	const { theme, changeTheme } = useContext(ThemeContext);
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
						<div className='flex-gap'>
							<button
								type='button'
								aria-label='system theme'
								onClick={() => changeTheme({ ...theme, scheme: 'system' })}
								className='btn full'>
								<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
									<path d='M261-478q0 39 15.5 77t47.5 72l2 2v-26q0-20 14-33.5t34-13.5q20 0 33.5 13.5T421-353v150q0 26-18.5 44.5T358-140H209q-20 0-33.5-14T162-188q0-20 14-33.5t34-13.5h29l-3-4q-53-52-77-114t-24-125q0-104 56.5-189T341-794q21-10 41 3.5t27 38.5q6 24-4 46.5T373-671q-51 29-81.5 80.5T261-478Zm438-4q0-39-15.5-77T636-631l-2-2v26q0 20-13.5 33.5T587-560q-20 0-34-14t-14-34v-149q0-26 18.5-44.5T602-820h149q20 0 33.5 13.5T798-773q0 20-13.5 34T751-725h-30l3 4q52 53 76.5 114.5T825-482q0 104-56.5 189T619-166q-21 10-41-3.5T551-208q-6-24 4-46.5t32-34.5q51-29 81.5-80.5T699-482Z' />
								</svg>
								<p>System</p>
							</button>
							<button
								type='button'
								aria-label='light theme'
								onClick={() => changeTheme({ ...theme, scheme: 'light' })}
								className='btn full'>
								<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
									<path d='M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-417q-26 0-44.5-18.5T17-480q0-26 18.5-44.5T80-543h80q26 0 44.5 18.5T223-480q0 26-18.5 44.5T160-417H80Zm720 0q-26 0-44.5-18.5T737-480q0-26 18.5-44.5T800-543h80q26 0 44.5 18.5T943-480q0 26-18.5 44.5T880-417h-80ZM480-737q-26 0-44.5-18.5T417-800v-80q0-26 18.5-44.5T480-943q26 0 44.5 18.5T543-880v80q0 26-18.5 44.5T480-737Zm0 720q-26 0-44.5-18.5T417-80v-80q0-26 18.5-44.5T480-223q26 0 44.5 18.5T543-160v80q0 26-18.5 44.5T480-17ZM210-661l-43-42q-19-18-18.5-44t18.5-46q18-19 44-19t45 19l43 43q18 18 17.5 43.5T299-662q-18 19-44 19.5T210-661Zm494 494-43-43q-18-18-18-43.5t18-44.5q18-19 44-18.5t45 18.5l43 41q19 18 18.5 44T793-167q-18 19-44 19t-45-19Zm-42-494q-19-18-18.5-44t18.5-45l41-43q18-19 44-18.5t46 18.5q19 18 19 44t-19 45l-43 43q-18 18-43.5 17.5T662-661ZM167-167q-19-18-19-44t19-45l43-43q18-18 43.5-18t44.5 18q19 18 18.5 44T298-210l-41 43q-18 19-44 18.5T167-167Z' />
								</svg>
								<p>Light</p>
							</button>
							<button
								type='button'
								aria-label='dark theme'
								onClick={() => changeTheme({ ...theme, scheme: 'dark' })}
								className='btn full'>
								<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
									<path d='M481-105q-162 0-269-106.5T105-480q0-121 68-222.5T375-840q23-8 42-5.5t32 12.5q14 10 20 26t4 36q-4 22-8 41t-4 38q0 97 68.5 165T696-459q20 0 40.5-2.5T776-468q19-2 33.5 3.5T833-448q9 11 11.5 28.5T840-379q-32 123-131.5 198.5T481-105Z' />
								</svg>
								<p>Dark</p>
							</button>
						</div>
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
