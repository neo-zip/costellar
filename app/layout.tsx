import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/providers/Theme';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { MantineProvider } from '@mantine/core';

const inter = Inter({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'costellar',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<ThemeProvider font={inter.className}>
				<MantineProvider>
					<Notifications autoClose={5000} />
					<ModalsProvider>{children}</ModalsProvider>
				</MantineProvider>
			</ThemeProvider>
		</html>
	);
}
