'use client';

import { createContext, useState } from 'react';

interface IdeasValues {
	addIdea: (idea: Ideas.Idea) => void;
	getIdea: (id: number) => Ideas.Idea | undefined;
	editIdea: (id: number, updatedIdea: Ideas.Idea) => void;
	deleteIdea: (id: number) => void;
	ideas: Ideas.Idea[];
}

export const IdeaContext = createContext<IdeasValues>({
	ideas: [],
	addIdea: () => {},
	getIdea: () => undefined,
	editIdea: () => {},
	deleteIdea: () => {},
});

export const IdeaProvider = ({ children }: { children: React.ReactNode }) => {
	const [ideas, setIdeas] = useState<Ideas.Idea[]>([]);

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

	return <IdeaContext.Provider value={{ addIdea, getIdea, editIdea, deleteIdea, ideas }}>{children}</IdeaContext.Provider>;
};
