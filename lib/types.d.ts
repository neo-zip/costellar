namespace Theme {
	type Values = 'light' | 'dark';
	type Schemes = Values | 'system';

	interface Themes {
		scheme: Schemes;
		readonly value: Values;
		accent: string;
	}
}

namespace Ideas {
	interface Idea {
		name: '';
		id: number;
		tag: Tags | Tags[];
	}

	type Tags = 'Web' | 'App' | 'Business';
}
