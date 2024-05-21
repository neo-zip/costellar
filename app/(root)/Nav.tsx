import React from 'react';
import styles from './page.module.css';
import { Tooltip } from '@mantine/core';

interface P {
	changeColor: () => void;
}

const Nav: React.FC<P> = ({ changeColor }) => {
	return (
		<div className={styles.options} style={{ margin: 5 }}>
			<Tooltip label='Refresh Color'>
				<button aria-label='Refresh Color' onClick={changeColor}>
					<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
						<path d='M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z' />
					</svg>
				</button>
			</Tooltip>
			<Tooltip label='Shuffle Ideas'>
				<button aria-label='Shuffle Ideas' onClick={changeColor}>
					<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
						<path d='M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z' />
					</svg>
				</button>
			</Tooltip>
		</div>
	);
};

export default Nav;
