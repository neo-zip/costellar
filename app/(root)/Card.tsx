import React, { useContext, useState } from 'react';
import styles from './page.module.css';
import { IdeasContext } from '@/providers/Ideas';
import { openModalForm } from '@/lib/util';
import { Menu, Tooltip } from '@mantine/core';
import { m } from 'framer-motion';
import { notifications } from '@mantine/notifications';

interface P {
	idea: Ideas.Idea;
	index: number;
}

const Card: React.FC<P> = ({ idea, index }) => {
	const { deleteIdea, editIdea } = useContext(IdeasContext);

	const handleEdit = () => {
		openModalForm({
			title: 'Editing Idea',
			options: ['name', 'description'],
			callback: (queries) =>
				editIdea(idea.id, {
					...idea,
					name: queries.name,
					description: queries.description,
				}),
			successMessage: "We've replaced your idea with a little bit of a better one.",
		});
	};

	const handleComplete = () => {
		editIdea(idea.id, {
			...idea,
			completed: true,
		});
		notifications.show({
			title: 'Congrats!',
			message: 'You finished an idea.',
		});
	};

	const handleDelete = () => {
		deleteIdea(idea.id);
		notifications.show({
			title: 'Byebye!',
			message: "We've deleted your idea forever!",
		});
	};

	return (
		<m.div
			initial={{ opacity: 0, scale: 0.75 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1, type: 'spring' }}
			className={'outline ' + styles.card}>
			<button className='flex-gap flex-col' onClick={handleComplete}>
				<h2>{idea.name}</h2>
				<p>{idea.description}</p>
			</button>
			<div className={styles.options}>
				<Menu>
					<Menu.Target>
						<Tooltip label='Options'>
							<button aria-label='Options'>
								<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
									<path d='M480.5-114q-39.5 0-67.5-27.91-28-27.9-28-67.09 0-39.6 27.91-67.8Q440.81-305 480-305q40 0 67.5 28.08 27.5 28.07 27.5 67.5Q575-170 547.5-142t-67 28Zm0-271q-39.5 0-67.5-27.91-28-27.9-28-67.09 0-40 27.91-67.5Q440.81-575 480-575q40 0 67.5 27.5t27.5 67q0 39.5-27.5 67.5t-67 28Zm0-270q-39.5 0-67.5-28.28-28-28.29-28-68 0-39.72 27.91-67.22Q440.81-846 480-846q40 0 67.5 27.5t27.5 67.22q0 39.71-27.5 68Q520-655 480.5-655Z' />
								</svg>
							</button>
						</Tooltip>
					</Menu.Target>

					<Menu.Dropdown>
						<Menu.Item onClick={handleEdit}>
							<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
								<path d='M117-348q0 18 17.5 29.5T189-302q23 3 36 21.5t12 41.5q-1 24-17 40t-39 13q-92-12-136-52T1-349q0-69 52.5-112.5T205-519q45-7 60.5-12.5T281-548q0-14-19-23.5T205-588q-23-4-36-22.5T158-652q2-24 20-39t41-11q88 16 133 54.5t45 99.5q0 55-42.5 91.5T230-406q-56 10-84.5 24.5T117-348Zm474 130L398-411l337-338q28-28 66.5-28t66.5 28l60 60q28 28 28 67t-28 67L591-218Zm-222 90q-27 5-47-15t-15-47l34-165 193 193-165 34Z' />
							</svg>
							<p>Edit</p>
						</Menu.Item>
						<Menu.Item onClick={handleDelete} style={{ '--color': 'var(--error)', '--text': '#fff' }}>
							<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
								<path d='M269-86q-53 0-89.5-36.5T143-212v-497q-26 0-44.5-18.5T80-772q0-26 18.5-44.5T143-835h194q0-26 18.5-44.5T400-898h158q26 0 44.5 18.5T621-835h196q26 0 44.5 18.5T880-772q0 26-18.5 44.5T817-709v497q0 53-36.5 89.5T691-86H269Zm125-195q21 0 36-15t15-36v-258q0-21-15-36t-36-15q-21 0-36.5 15T342-590v258q0 21 15.5 36t36.5 15Zm173 0q21 0 36-15t15-36v-258q0-21-15-36t-36-15q-21 0-36.5 15T515-590v258q0 21 15.5 36t36.5 15Z' />
							</svg>
							<p>Delete</p>
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</div>
		</m.div>
	);
};

export default Card;
