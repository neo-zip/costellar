import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';

interface ModalFormProps {
	title: string;
	options: string[];
	callback: (queries: string[]) => void;
	successMessage: string;
}

export const openModalForm = ({ title, options, callback, successMessage }: ModalFormProps) => {
	modals.open({
		title: title,
		children: (
			<form
				className='flex-col'
				action={(query: any) => {
					const queries = {};
					
					options.forEach((option) => {
						const input = query.get(option);

						if ( input.length < 1 || input.length > 200 ) {
							notifications.show({ title: 'Sorry!', message: 'Please provide 1-200 letters each.' });
							return;
						}

						queries[option] = input;
					})

					callback(queries);

					notifications.show({
						title: 'Woohoo',
						message: successMessage,
					});
					modals.closeAll();
				}}>
				{options.map((option) => {
					return <input className='input' placeholder={option + '...'} name={option} />;
				})}
				<button className='btn' type='submit'>
					Okay
				</button>
			</form>
		),
	});
}