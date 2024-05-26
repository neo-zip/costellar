'use client';

import { createContext, useEffect, useState } from 'react';

interface UserValues {
	updateUser: (to: User) => void;
	user: User | undefined;
}

export const UserContext = createContext<UserValues>({
	user: undefined,
	updateUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | undefined>(undefined);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		if (!user) {
			const exists = window.localStorage.getItem('user');

			if (!exists) {
				setUser({
					name: undefined,
					setupComplete: false,
					theme: 'system',
				});
				console.log('Created User');
				return;
			}

			setUser(JSON.parse(exists));
			console.log('Loaded User');
			return;
		}

		window.localStorage.setItem('user', JSON.stringify(user));
		console.log('Saved User');
	}, [user]);

	const updateUser = (to: User) => {
		setUser(to);
	};

	return <UserContext.Provider value={{ updateUser, user }}>{children}</UserContext.Provider>;
};
