'use client';

import { shuffle } from '@/lib/util';
import { createContext, useCallback, useEffect, useState } from 'react';

type RandomIdeas =
	| null
	| { ideas: Ideas.Idea[] }
	| {
			randomIdeas: Ideas.Idea[];
			shuffleIdeas: () => void;
	  };

interface IdeasValues {
	addIdea: (idea: PartialOnly<Ideas.Idea, 'id'>) => void;
	getIdea: (id: number) => Ideas.Idea | undefined;
	editIdea: (id: number, updatedIdea: Ideas.Idea) => void;
	deleteIdea: (id: number) => void;
	shuffleIdeas: () => void;
	ideas: Ideas.Idea[] | undefined;
	random: Ideas.Idea[] | undefined;
}

export const IdeasContext = createContext<IdeasValues>({
	ideas: undefined,
	random: undefined,
	addIdea: () => {},
	getIdea: () => undefined,
	editIdea: () => {},
	deleteIdea: () => {},
	shuffleIdeas: () => {},
});

// using a provider and not /api because it should work offline

export const IdeasProvider = ({ children }: { children: React.ReactNode }) => {
	const [ideas, setIdeas] = useState<Ideas.Idea[] | undefined>(undefined);
	const [random, setRandom] = useState<Ideas.Idea[] | undefined>(undefined);

	const shuffleIdeas = () => {
		if (!ideas) {
			return;
		}

		const avaliable = ideas.filter((idea) => !idea.completed);

		if (avaliable.length < 3) {
			setRandom(avaliable);
			return;
		}

		setRandom(shuffle(avaliable).slice(0, 3));
	};

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		if (!ideas) {
			setIdeas(JSON.parse(window.localStorage.getItem('ideas') ?? '[]'));
			console.log('Loaded Ideas');
			return;
		}

		window.localStorage.setItem('ideas', JSON.stringify(ideas));
		console.log('Saved Ideas');
	}, [ideas]);

	useEffect(() => {
		shuffleIdeas();
	}, [ideas]);

	const addIdea = (idea: PartialOnly<Ideas.Idea, 'id'>) => {
		if (!ideas) {
			return;
		}

		setIdeas([...ideas, { ...idea, id: ideas.length + 1 }]);
	};

	const getIdea = (id: number) => {
		if (!ideas) {
			return;
		}

		return ideas.find((idea) => idea.id === id);
	};

	const editIdea = (id: number, updatedIdea: Ideas.Idea) => {
		if (!ideas) {
			return;
		}

		setIdeas(ideas.map((idea) => (idea.id === id ? updatedIdea : idea)));
	};

	const deleteIdea = (id: number) => {
		if (!ideas) {
			return;
		}

		setIdeas(ideas.filter((idea) => idea.id != id));
	};

	return (
		<IdeasContext.Provider value={{ shuffleIdeas, addIdea, getIdea, editIdea, deleteIdea, ideas, random }}>
			{children}
		</IdeasContext.Provider>
	);
};
