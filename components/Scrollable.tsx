import React from 'react';

interface Props {
	children: React.ReactNode;
	className?: string;
	locked?: boolean;
}

const Scrollable: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({ children, className, locked, ...rest }) => {
	return (
		<div className={`scroll${locked ? ' locked' : ''} ${className}`} {...rest}>
			{children}
		</div>
	);
};

export default Scrollable;
