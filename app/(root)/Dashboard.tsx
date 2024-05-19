'use client';

import { IdeasContext } from '@/providers/Ideas';
import React, { useContext } from 'react';
import { Grid } from '@mantine/core';
import Card from './Card';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import styles from './page.module.css';

const Dashboard: React.FC = () => {
	const { ideas, addIdea } = useContext(IdeasContext);

	const handleAddIdea = () => {
		modals.open({
			title: 'Adding Course',
			children: (
				<form
					className='flex-col'
					action={(query: any) => {
						const name = query.get('name');
						const description = query.get('description');

						if (name.length < 1 || name.length > 200 || description.length < 1 || description.length > 200) {
							notifications.show({ title: 'Sorry!', message: 'Please provide idea name & description. (1-200 letters)' });
							return;
						}

						addIdea({
							name: name,
							id: 1,
							tag: 'Web',
							description: description,
						});

						notifications.show({
							title: 'Woohoo',
							message: "We've added your idea!",
						});
						modals.closeAll();
					}}>
					<input className='input' placeholder='name...' name='name' />
					<input className='input' placeholder='description...' name='description' />
					<button className='btn' type='submit'>
						Okay
					</button>
				</form>
			),
		});
	};

	return ideas.length > 0 ? (
		<div className={styles.grid}>
			{ideas.map((idea: Ideas.Idea, _) => {
				return <Card key={_} idea={idea} />;
			})}
			<button className={'outline ' + styles.card} onClick={handleAddIdea}>
				<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
					<path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z' />
				</svg>
				<p>Add</p>
			</button>
		</div>
	) : (
		<div className='flex-col flex-gap'>
			<p className='label'>Lets add some ideas.</p>
			<button className='btn' onClick={handleAddIdea}>
				<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
					<path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z' />
				</svg>
				<p>Add</p>
			</button>
		</div>
	);
};
export default Dashboard;
