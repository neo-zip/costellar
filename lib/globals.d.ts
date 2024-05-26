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
	}

	type Tags = 'Web' | 'App' | 'Business';
}

type PartialOnly<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
