'use client';

import { IdeasProvider } from '@/providers/Ideas';
import { LazyMotion } from 'framer-motion';

interface P {
	children: React.ReactNode;
}

const Layout: React.FC<P> = ({ children }) => {
	return (
		<IdeasProvider>
			<LazyMotion features={() => import('@/lib/framer').then((res) => res.default)}>{children}</LazyMotion>
		</IdeasProvider>
	);
};
export default Layout;
