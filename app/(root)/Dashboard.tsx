'use client';

import { IdeasContext } from '@/providers/Ideas';
import React, { useContext } from 'react';
import { openModalForm } from '@/lib/util';
import Card from './Card';
import styles from './page.module.css';
import Loading from '../loading';
import { AnimatePresence } from 'framer-motion';

const Dashboard: React.FC = () => {
	const { random, addIdea } = useContext(IdeasContext);

	if (!random) {
		return (
			<div className='center full'>
				<Loading />
			</div>
		);
	}

	const handleAddIdea = () => {
		openModalForm({
			title: 'Adding Idea',
			options: ['name', 'description'],
			callback: (queries) =>
				addIdea({
					name: queries.name,
					tag: 'Web',
					description: queries.description,
					completed: false,
				}),
			successMessage: "We've added your idea.",
		});
	};

	return (
		<div className={'center ' + styles.wrapper}>
			{random.length < 1 && <h3 style={{ marginBottom: 20 }}>Let&apos;s cook up some ideas</h3>}
			<div className={styles.grid}>
				{random.map((idea: Ideas.Idea, i) => {
					return <AnimatePresence key={i}>{!idea.completed && <Card index={i} idea={idea} />}</AnimatePresence>;
				})}
				<button className={'outline ' + styles.card + ' ' + styles.add} onClick={handleAddIdea}>
					<div className='flex-gap flex-align'>
						<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
							<path d='M224-491q32-78 75.5-149T397-776l-57-11q-31-6-61 3t-53 32L109-635q-23 23-17 55.5t36 46.5l96 42Zm646-432q-109 2-208 44T486-760q-54 54-95 115.5T318-515q-9 20-7.5 41.5T327-437l123 123q15 15 36.5 16.5T528-306q67-33 129-73.5T773-474q77-77 119-175.5T936-857q0-13-5.5-25T916-903q-9-9-21-14.5t-25-5.5ZM614-602q-21-21-21-51t21-51q21-21 51.5-21t51.5 21q21 21 21 51t-21 51q-21 21-51.5 21T614-602ZM504-212l41 97q14 31 46.5 37T648-96l117-117q23-23 32-53t3-61l-11-57q-65 54-136 97t-149 75ZM119-316q45-45 107-45t107 45q45 45 45 107t-45 107q-58 58-139.5 70T30-13q7-82 19-163.5T119-316Z' />
						</svg>
						<b>Start a New Idea</b>
					</div>
				</button>
			</div>
		</div>
	);
};
export default Dashboard;
