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
		name: string;
		description: string;
		id: number;
		tag: Tags | Tags[];
	}

	type Tags = 'Web' | 'App' | 'Business';
}
