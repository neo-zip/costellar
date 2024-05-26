'use client';

import { useColorScheme } from '@mantine/hooks';
import { createContext, useEffect, useState } from 'react';

interface ThemeValues {
	changeTheme: (to: Theme.Themes) => void;
	theme: Theme.Themes;
}

interface P {
	children: React.ReactNode;
	font: string;
}

const accent = '#059669';
const initial: Theme.Themes = {
	scheme: 'system',
	value: 'dark',
	accent: accent,
};

export const ThemeContext = createContext<ThemeValues>({
	theme: initial,
	changeTheme: () => {},
});

export const ThemeProvider: React.FC<P> = ({ children, font }) => {
	const [theme, setTheme] = useState<Theme.Themes>(initial);
	const systemScheme = useColorScheme();

	useEffect(() => {
		changeTheme({
			...theme,
			scheme: 'system',
			value: systemScheme,
		});
	}, [systemScheme]);

	const changeTheme = (to: PartialOnly<Theme.Themes, 'value'>) => {
		if (to.scheme === 'system') {
			setTheme({
				accent: to.accent,
				scheme: to.scheme,
				value: systemScheme,
			});
			return;
		}

		setTheme({
			accent: to.accent,
			scheme: to.scheme,
			value: to.scheme,
		});
	};
	return (
		<ThemeContext.Provider value={{ changeTheme, theme }}>
			<body className={`mount ${theme.value} ${font}`} style={{ '--accent': theme.accent } as React.CSSProperties}>
				{children}
			</body>
		</ThemeContext.Provider>
	);
};
