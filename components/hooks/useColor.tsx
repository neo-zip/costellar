import { useState, useCallback } from 'react';

const colorPairs = [
	{ start: '#74b8e8', end: '#5234eb' },
	{ start: '#74b8e8', end: '#6195ba' },
	{ start: '#aa0000', end: '#880000' },
	{ start: '#e67ec5', end: '#a64e8a' },
];

const getColors = () => {
	return colorPairs[Math.floor(Math.random() * colorPairs.length)];
};

const useColor = () => {
	const [colors, setColors] = useState(getColors());

	const fetchNewColor = useCallback(() => {
		setColors(getColors());
	}, []);

	return { colors, fetchNewColor };
};

export default useColor;
