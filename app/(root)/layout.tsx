import { IdeasProvider } from '@/providers/Ideas';

interface P {
	children: React.ReactNode;
}

const Layout: React.FC<P> = ({ children }) => {
	return <IdeasProvider>{children}</IdeasProvider>;
};
export default Layout;
