import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';

export function shuffle(array: any[]) {
	if (!array || array.length < 1) {
		throw new Error('Array not long enough');
	}

	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}

type Queries = {
	[key: string]: string;
};

interface ModalFormProps {
	title: string;
	options: string[];
	callback: (queries: Queries) => void;
	successMessage: string;
	errorMessage?: string;
}

export const openModalForm = ({ title, options, callback, successMessage, errorMessage }: ModalFormProps) => {
	modals.open({
		title: title,
		children: (
			<form
				className='flex-col'
				action={(query: any) => {
					const queries: Queries = {};

					for (let i = 0; i < options.length; i++) {
						const input = query.get(options[i]);

						if (input.length < 1 || input.length > 200) {
							notifications.show({ title: 'Sorry!', message: errorMessage ?? 'Please provide 1-200 letters each.' });
							return;
						}

						queries[options[i]] = input;
					}

					callback(queries);

					notifications.show({
						title: 'Woohoo',
						message: successMessage,
					});
					modals.closeAll();
				}}>
				{options.map((option) => {
					return <input key={option} className='input' placeholder={option + '...'} name={option} />;
				})}
				<button className='btn' type='submit'>
					Okay
				</button>
			</form>
		),
	});
};
