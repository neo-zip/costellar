'use client';

import { IdeasContext } from '@/providers/Ideas';
import React, { useContext } from 'react';
import { Grid } from '@mantine/core';

const Dashboard: React.FC = () => {
	const { ideas } = useContext(IdeasContext);

	return ideas.length > 1 ? (
		<Grid grow>
			{ideas.map((idea: Ideas.Idea, _) => {
				return <div key={_}>{idea.name}</div>;
			})}
		</Grid>
	) : (
		<div className='flex-col flex-gap'>
			<p className='label'>Lets add some ideas.</p>
			<p></p>
		</div>
	);
};
export default Dashboard;
