import React, { useContext } from 'react';
import styles from './page.module.css';
import { Menu, Tooltip } from '@mantine/core';
import { IdeasContext } from '@/providers/Ideas';
import { ThemeContext } from '@/providers/Theme';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { UserContext } from '@/providers/User';
import { openModalForm } from '@/lib/util';

interface P {
	changeColor: () => void;
}

const Nav: React.FC<P> = ({ changeColor }) => {
	const { ideas, shuffleIdeas, editIdea, deleteIdea } = useContext(IdeasContext);
	const { theme, changeTheme } = useContext(ThemeContext);
	const { user, updateUser } = useContext(UserContext);

	if (!ideas || !user) return;

	const viewCompleted = () => {
		modals.open({
			title: 'Completed Ideas',
			children: (
				<div className='flex-col flex-gap' onClick={modals.closeAll}>
					{ideas
						.filter((idea) => idea.completed)
						.map((idea, i) => {
							return (
								<div key={i} className='flex-gap flex-space flex-align'>
									<h3>{idea.name}</h3>
									<div className='flex-align' style={{ gap: 15 }}>
										<button
											className='a'
											onClick={() => {
												editIdea(idea.id, {
													...idea,
													completed: false,
												});

												notifications.show({
													title: 'Woohoo!',
													message: "We've brang your idea back to life.",
												});
											}}>
											Restore
										</button>
										<Tooltip label='Delete'>
											<button
												className={styles.remove}
												onClick={() => {
													deleteIdea(idea.id);
													notifications.show({
														title: 'Byebye!',
														message: "We've deleted your idea forever!",
													});
												}}>
												<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
													<path d='M229-417q-26 0-44.5-18.5T166-480q0-26 18.5-44.5T229-543h502q26 0 44.5 18.5T794-480q0 26-18.5 44.5T731-417H229Z' />
												</svg>
											</button>
										</Tooltip>
									</div>
								</div>
							);
						})}
				</div>
			),
		});
	};

	return (
		<div className={styles.options} style={{ margin: 5 }}>
			<Menu>
				<Menu.Target>
					<Tooltip label='Settings'>
						<button aria-label='Open Settings'>
							<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
								<path d='M414-46q-32 0-55-20.5T332-118l-9-67q-5-2-10-5l-10-6-61 26q-29 12-59 2.5T137-205L71-322q-16-27-9.5-57.5T93-429l52-40v-22l-52-39q-26-19-32-49.5T71-638l66-116q16-27 45.5-37t58.5 2l64 26q5-3 9-5.5t9-4.5l9-68q4-32 27-52.5t55-20.5h132q32 0 55 20.5t27 52.5l9 68q5 2 10 4.5t10 5.5l61-26q29-12 59-2t46 37l66 116q16 28 10 58.5T867-530l-53 39v11q0 3-.5 5.5t-.5 5.5l53 39q26 19 32 49.5T888-322l-67 117q-16 27-45.5 37t-58.5-2l-62-26q-5 3-9 6t-9 5l-9 67q-4 31-27 51.5T546-46H414Zm65-294q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Z' />
							</svg>
						</button>
					</Tooltip>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Label>Theme</Menu.Label>
					<Menu.Item aria-label='Refresh Color' onClick={changeColor}>
						<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
							<path d='M476-126q-147 0-250.5-103.5T122-480q0-147 103.5-250.5T476-834q78 0 147.5 31.5T742-711v-75q0-20.4 13.8-34.2Q769.6-834 790-834q20.4 0 34.2 13.8Q838-806.4 838-786v218q0 26-18.5 44.5T775-505H555q-19.97 0-33.49-13.8Q508-532.6 508-553q0-19.97 13.8-33.49Q535.6-600 556-600h114q-32-50-83.09-79-51.08-29-110.91-29-95 0-161.5 66.5T248-480q0 95 66.5 161.5T476-252q57 0 106-27t81-72q13.62-20.16 38.31-28.08Q726-387 748.74-378 773-369 784-347q11 22-1 42-47 81-128.5 130T476-126Z' />
						</svg>
						<p>Refresh Color</p>
					</Menu.Item>
					{theme.scheme === 'system' && (
						<Menu.Item aria-label='Use Light Mode' onClick={() => changeTheme({ ...theme, scheme: 'light' })}>
							<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
								<path d='M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-417q-26 0-44.5-18.5T17-480q0-26 18.5-44.5T80-543h80q26 0 44.5 18.5T223-480q0 26-18.5 44.5T160-417H80Zm720 0q-26 0-44.5-18.5T737-480q0-26 18.5-44.5T800-543h80q26 0 44.5 18.5T943-480q0 26-18.5 44.5T880-417h-80ZM480-737q-26 0-44.5-18.5T417-800v-80q0-26 18.5-44.5T480-943q26 0 44.5 18.5T543-880v80q0 26-18.5 44.5T480-737Zm0 720q-26 0-44.5-18.5T417-80v-80q0-26 18.5-44.5T480-223q26 0 44.5 18.5T543-160v80q0 26-18.5 44.5T480-17ZM210-661l-43-42q-19-18-18.5-44t18.5-46q18-19 44-19t45 19l43 43q18 18 17.5 43.5T299-662q-18 19-44 19.5T210-661Zm494 494-43-43q-18-18-18-43.5t18-44.5q18-19 44-18.5t45 18.5l43 41q19 18 18.5 44T793-167q-18 19-44 19t-45-19Zm-42-494q-19-18-18.5-44t18.5-45l41-43q18-19 44-18.5t46 18.5q19 18 19 44t-19 45l-43 43q-18 18-43.5 17.5T662-661ZM167-167q-19-18-19-44t19-45l43-43q18-18 43.5-18t44.5 18q19 18 18.5 44T298-210l-41 43q-18 19-44 18.5T167-167Z' />
							</svg>
							<p>Use Light Mode</p>
						</Menu.Item>
					)}
					{theme.scheme === 'light' && (
						<Menu.Item aria-label='Use Dark Mode' onClick={() => changeTheme({ ...theme, scheme: 'dark' })}>
							<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
								<path d='M481-105q-162 0-269-106.5T105-480q0-121 68-222.5T375-840q23-8 42-5.5t32 12.5q14 10 20 26t4 36q-4 22-8 41t-4 38q0 97 68.5 165T696-459q20 0 40.5-2.5T776-468q19-2 33.5 3.5T833-448q9 11 11.5 28.5T840-379q-32 123-131.5 198.5T481-105Z' />
							</svg>
							<p>Use Dark Mode</p>
						</Menu.Item>
					)}
					{theme.scheme === 'dark' && (
						<Menu.Item aria-label='Use System Scheme' onClick={() => changeTheme({ ...theme, scheme: 'system' })}>
							<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
								<path d='M261-478q0 39 15.5 77t47.5 72l2 2v-26q0-20 14-33.5t34-13.5q20 0 33.5 13.5T421-353v150q0 26-18.5 44.5T358-140H209q-20 0-33.5-14T162-188q0-20 14-33.5t34-13.5h29l-3-4q-53-52-77-114t-24-125q0-104 56.5-189T341-794q21-10 41 3.5t27 38.5q6 24-4 46.5T373-671q-51 29-81.5 80.5T261-478Zm438-4q0-39-15.5-77T636-631l-2-2v26q0 20-13.5 33.5T587-560q-20 0-34-14t-14-34v-149q0-26 18.5-44.5T602-820h149q20 0 33.5 13.5T798-773q0 20-13.5 34T751-725h-30l3 4q52 53 76.5 114.5T825-482q0 104-56.5 189T619-166q-21 10-41-3.5T551-208q-6-24 4-46.5t32-34.5q51-29 81.5-80.5T699-482Z' />
							</svg>
							<p>Use System Scheme</p>
						</Menu.Item>
					)}

					<Menu.Label>Ideas</Menu.Label>
					<Menu.Item aria-label='Shuffle Ideas' onClick={shuffleIdeas}>
						<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
							<path d='M609-126q-23 0-39-16t-16-39q0-23 16-39t39-16h35l-72-72q-17-17-16.5-39.5T573-387q17-16 39-16t39 16l72 70v-32q0-23 16.5-39t39.5-16q23 0 39 16t16 39v160q0 26-18.5 44.5T771-126H609Zm-467-16q-16-16-15.5-39t16.5-39l501-503h-35q-23 0-39-16.5T554-779q0-23 16.5-39t39.5-16h161q26 0 44.5 18.5T834-771v161q0 23-16 39t-39 16q-23 0-39.5-16.5T723-611v-34L220-142q-16 16-39 16.5T142-142Zm1-598q-16-16-16-38t16-39q16-17 38-17t39 16l172 171q17 17 17 39t-17 39q-17 16-39 16.5T314-569L143-740Z' />
						</svg>
						<p>Shuffle</p>
					</Menu.Item>
					<Menu.Item
						aria-label='View Completed Ideas'
						onClick={viewCompleted}
						className={ideas.filter((idea) => idea.completed).length <= 0 ? 'disabled' : ''}
						disabled={ideas.filter((idea) => idea.completed).length <= 0}>
						<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
							<path d='M478-86q-133 0-237-78.5T101-366q-7-23 9-42t42-23q25-4 46.5 8.5T228-387q29 78 96.5 126.5T478-212q112 0 190-78t78-190q0-112-78-190t-190-78q-57 0-109 23.5T279-657h34q20 0 34 14t14 34q0 20-14 34.5T313-560H157q-26 0-44.5-18.5T94-623v-155q0-20 14-33.5t34-13.5q20 0 33.5 13.5T189-778v32q56-62 130.5-95T478-874q81 0 153 31t125.5 84.5Q810-705 841-633t31 153q0 81-31 153t-84.5 125.5Q703-148 631-117T478-86Zm50-410 91 90q14 14 14 34t-14 34q-14 14-34 14t-34-14L451-438q-9-9-13.5-20t-4.5-24v-151q0-20 14-33.5t34-13.5q20 0 33.5 13.5T528-633v137Z' />
						</svg>
						<p>View Completed</p>
					</Menu.Item>

					<Menu.Label>User</Menu.Label>
					<Menu.Item
						aria-label='Change Name'
						onClick={() =>
							openModalForm({
								title: 'Change name',
								options: ['name'],
								callback: (queries) =>
									updateUser({
										...user,
										name: queries.name,
									}),
								successMessage: "We've changed your identity!",
							})
						}>
						<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
							<path d='M480-497q-81 0-137.5-56.5T286-691q0-81 56.5-137T480-884q81 0 137.5 56T674-691q0 81-56.5 137.5T480-497ZM126-235v-22q0-43 22.5-79.5T209-392q65-32 133-48.5T480-457q72 0 140 16t131 48q38 19 60.5 55t22.5 81v22q0 53-36.5 89.5T708-109H252q-53 0-89.5-36.5T126-235Z' />
						</svg>
						<p>Change Name</p>
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</div>
	);
};

export default Nav;
