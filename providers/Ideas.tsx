'use client';

import { createContext, useEffect, useState } from 'react';

interface IdeasValues {
	addIdea: (idea: Ideas.Idea) => void;
	getIdea: (id: number) => Ideas.Idea | undefined;
	editIdea: (id: number, updatedIdea: Ideas.Idea) => void;
	deleteIdea: (id: number) => void;
	ideas: Ideas.Idea[] | null;
}

export const IdeasContext = createContext<IdeasValues>({
	ideas: null,
	addIdea: () => {},
	getIdea: () => undefined,
	editIdea: () => {},
	deleteIdea: () => {},
});

export const IdeasProvider = ({ children }: { children: React.ReactNode }) => {
	const [ideas, setIdeas] = useState<Ideas.Idea[] | null>(null);

	console.log(ideas);

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

	const addIdea = (idea: Ideas.Idea) => {
		if (!ideas) {
			return;
		}

		setIdeas([...ideas, idea]);
	};

	const getIdea = (index: number): Ideas.Idea | undefined => {
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

	return <IdeasContext.Provider value={{ addIdea, getIdea, editIdea, deleteIdea, ideas }}>{children}</IdeasContext.Provider>;
};
