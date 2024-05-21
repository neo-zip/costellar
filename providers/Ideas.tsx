'use client';

import { createContext, useCallback, useEffect, useState } from 'react';

interface IdeasValues {
	addIdea: (idea: Ideas.Idea) => void;
	getIdea: (id: number) => Ideas.Idea | undefined;
	editIdea: (id: number, updatedIdea: Ideas.Idea) => void;
	deleteIdea: (id: number) => void;
	getRandomIdeas: () => Ideas.Idea[] | null;
	ideas: Ideas.Idea[] | null;
}

export const IdeasContext = createContext<IdeasValues>({
	ideas: null,
	addIdea: () => {},
	getIdea: () => undefined,
	editIdea: () => {},
	deleteIdea: () => {},
	getRandomIdeas: () => null,
});

export const IdeasProvider = ({ children }: { children: React.ReactNode }) => {
	const [ideas, setIdeas] = useState<Ideas.Idea[] | null>(null);

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

	const useRandomIdeas = () => {
		if (!ideas) {
			return null;
		}

		if (ideas.length < 3) {
			return { ideas };
		}

		const [randomIdeas, setRandomIdeas] = useState<Ideas.Idea>();

		const shuffleIdeas = useCallback(() => {
			const shuffled = ideas;
			shuffled.sort(() => Math.random() - 0.5);
			return shuffled.slice(0, 3);
		}, []);

		return { randomIdeas, shuffleIdeas };
	};

	const addIdea = (idea: Ideas.Idea) => {
		if (!ideas) {
			return;
		}

		setIdeas([...ideas, idea]);
	};

	const getIdea = (index: number) => {
		if (!ideas) {
			return;
		}

		return ideas.find((_, i) => i === index);
	};

	const editIdea = (index: number, updatedIdea: Ideas.Idea) => {
		if (!ideas) {
			return;
		}

		setIdeas(ideas.map((idea, i) => (i === index ? updatedIdea : idea)));
	};

	const deleteIdea = (index: number) => {
		if (!ideas) {
			return;
		}

		setIdeas(ideas.filter((_, i) => i != index));
	};

	return (
		<IdeasContext.Provider value={{ addIdea, getIdea, getRandomIdeas, editIdea, deleteIdea, ideas }}>
			{children}
		</IdeasContext.Provider>
	);
};
