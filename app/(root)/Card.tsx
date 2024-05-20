import React, { useContext } from 'react';
import styles from './page.module.css';
import { IdeasContext } from '@/providers/Ideas';
import { openModalForm } from '@/lib/util';

interface P {
	idea: Ideas.Idea;
}

const Card: React.FC<P> = ({ idea }) => {
	const { deleteIdea, editIdea } = useContext(IdeasContext);

	const handleEdit = () => {
		openModalForm({
			title: 'Editing Idea',
			options: ['name', 'description'],
			callback: (queries: string[]) => editIdea(idea.id,{
				...idea,
				name: queries.name,
				description: queries.description,
			}),
			successMessage: "We've replaced your idea with a little bit of a better one.",
		});
	}

	return (
		<div className={'outline ' + styles.card} onClick={() => deleteIdea(idea.id)}>
			<h2>{idea.name}</h2>
			<p>{idea.description}</p>
			<Tooltip label='Edit'>
				<button className={"icon " + styles.options} aria-label="Edit" onClick={handleEdit}>
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
				</button>
			</Tooltip>
		</div>
	);
};

export default Card;
