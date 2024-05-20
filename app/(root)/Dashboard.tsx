'use client';

import { IdeasContext } from '@/providers/Ideas';
import React, { useContext } from 'react';
import { openModalForm } from '@/lib/util';
import Card from './Card';
import styles from './page.module.css';
import Loading from '../loading';

const Dashboard: React.FC = () => {
	const { ideas, addIdea } = useContext(IdeasContext);

	if (!ideas) {
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
			callback: (queries: string[]) => addIdea({
				name: queries.name,
				id: ideas.length,
				tag: 'Web',
				description: queries.description,
			}),
			successMessage: "We've added your idea.",
		});
	};

	return (
		<div className={'center ' + styles.wrapper}>
			{ideas.length < 1 && <p className='label'>Lets add some ideas.</p>}
			<div className={styles.grid}>
				{ideas.map((idea: Ideas.Idea, _) => {
					return <Card key={_} idea={idea} />;
				})}
				<button className={'outline ' + styles.card + ' ' + styles.add} onClick={handleAddIdea}>
					<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
						<path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z' />
					</svg>
					<p>Add</p>
				</button>
			</div>
		</div>
	);
};
export default Dashboard;
