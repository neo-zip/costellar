import React from 'react';
import styles from './loader.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	size?: 'small' | 'large';
}

const Loader: React.FC<Props> = ({ size }) => {
	return (
		<div className='full center'>
			<div className={`${styles.loader} ${size === 'small' ? 'small' : ''}`}>
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	);
};

export default Loader;
