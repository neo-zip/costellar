export const log = (...e: string[]) => {
	if (process.env.NODE_ENV === 'development') {
		console.log('%cLS', 'background:#1d9bf0;color: #111;border-radius:5px;padding:0 5px;', ...e);
	}
};
