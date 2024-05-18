import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
	return (
		<div className={`center full ${styles.notfound}`}>
			<h1>404</h1>
			<div className='flex-col center-text flex-align flex-gap'>
				<h2>We couldn&#39;t find the page you&#39;re looking for.</h2>
				<Link className='btn center-text' href='/'>
					Return Home
				</Link>
			</div>
		</div>
	);
}
