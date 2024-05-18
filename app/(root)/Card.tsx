import React from 'react';

interface P {
	idea: Ideas.Idea;
}

const Card: React.FC<P> = ({ idea }) => {
	return (
		<div className='outline'>
			<h2>Idea</h2>
		</div>
	);
};

export default Card;
