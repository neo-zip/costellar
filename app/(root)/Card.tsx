import React from 'react';
import styles from './page.module.css';

interface P {
	idea: Ideas.Idea;
}

const Card: React.FC<P> = ({ idea }) => {
	return (
		<div className={'outline ' + styles.card}>
			<h2>{idea.name}</h2>
			<p>{idea.description}</p>
		</div>
	);
};

export default Card;
