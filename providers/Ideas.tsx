'use client';

import { log } from '@/lib/util';
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
			log('Cannot access localstorage on server: skipping data.');
			return;
		}

		if (!ideas) {
			setIdeas(JSON.parse(window.localStorage.getItem('ideas') ?? '[]'));
			log('Loaded Ideas');
			return;
		}

		window.localStorage.setItem('ideas', JSON.stringify(ideas));
		log('Saved Ideas');
	}, [ideas]);

	const addIdea = (idea: Ideas.Idea) => {
		if (!ideas) {
			return;
		}

		setIdeas([...ideas, idea]);
	};

	const getIdea = (id: number): Ideas.Idea | undefined => {
		if (!ideas) {
			return;
		}

		return ideas.find((idea) => idea.id === id);
	};

	const editIdea = (id: number, updatedIdea: Ideas.Idea) => {
		if (!ideas) {
			return;
		}

		setIdeas(ideas.map((idea, index) => (index === id ? updatedIdea : idea)));
	};

	const deleteIdea = (id: number) => {
		if (!ideas) {
			return;
		}

		setIdeas(ideas.filter((idea) => idea.id === id));
	};

	return <IdeasContext.Provider value={{ addIdea, getIdea, editIdea, deleteIdea, ideas }}>{children}</IdeasContext.Provider>;
};
