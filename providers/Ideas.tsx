'use client';

import { log } from '@/lib/util';
import { createContext, useMemo, useState } from 'react';

const initial: Ideas.Idea[] = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('ideas') ?? '[]') : [];

interface IdeasValues {
	addIdea: (idea: Ideas.Idea) => void;
	getIdea: (id: number) => Ideas.Idea | undefined;
	editIdea: (id: number, updatedIdea: Ideas.Idea) => void;
	deleteIdea: (id: number) => void;
	ideas: Ideas.Idea[];
}

export const IdeasContext = createContext<IdeasValues>({
	ideas: initial,
	addIdea: () => {},
	getIdea: () => undefined,
	editIdea: () => {},
	deleteIdea: () => {},
});

export const IdeasProvider = ({ children }: { children: React.ReactNode }) => {
	const [ideas, setIdeas] = useState<Ideas.Idea[]>(initial);

	console.log(ideas);

	useMemo(() => {
		if (typeof window === 'undefined') {
			log('Not available');
			return;
		}

		window.localStorage.setItem('ideas', JSON.stringify(ideas));
		log('Saved Ideas');
	}, [ideas]);

	const addIdea = (idea: Ideas.Idea) => {
		setIdeas([...ideas, idea]);
	};

	const getIdea = (id: number): Ideas.Idea | undefined => {
		return ideas.find((idea) => idea.id === id);
	};

	const editIdea = (id: number, updatedIdea: Ideas.Idea) => {
		setIdeas((prevIdeas) => prevIdeas.map((idea, index) => (index === id ? updatedIdea : idea)));
	};

	const deleteIdea = (id: number) => {
		setIdeas(ideas.filter((idea) => idea.id === id));
	};

	return <IdeasContext.Provider value={{ addIdea, getIdea, editIdea, deleteIdea, ideas }}>{children}</IdeasContext.Provider>;
};
