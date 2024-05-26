namespace Theme {
	type Values = 'light' | 'dark';
	type Schemes = Values | 'system';

	interface Themes {
		scheme: Schemes;
		value: Values;
		accent: string;
	}
}

namespace Ideas {
	interface Idea {
		id: number;
		name: string;
		description: string;
		tag: Tags | Tags[];
		completed: boolean;
	}

	type Tags = 'Web' | 'App' | 'Business';
}

interface User {
	name: string | undefined;
	theme: Theme.Schemes;
	setupComplete: boolean;
}

/**
 * Construct a type with the properties of T and make those in type K partial.
 */
type PartialOnly<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
