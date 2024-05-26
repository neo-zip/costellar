import React, { useContext, useState } from 'react';
import styles from './page.module.css';
import { IdeasContext } from '@/providers/Ideas';
import { openModalForm } from '@/lib/util';
import { Tooltip } from '@mantine/core';
import { m } from 'framer-motion';

interface P {
	idea: Ideas.Idea;
}

const Card: React.FC<P> = ({ idea }) => {
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

	return (
		<m.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={'outline ' + styles.card}>
			<div className='flex-gap flex-col' onClick={() => deleteIdea(idea.id)}>
				<h2>{idea.name}</h2>
				<p>{idea.description}</p>
			</div>
			<div className={styles.options}>
				<Tooltip label='Edit'>
					<button aria-label='Edit' onClick={handleEdit}>
						<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
							<path d='M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z' />
						</svg>
					</button>
				</Tooltip>
			</div>
		</m.div>
	);
};

export default Card;
