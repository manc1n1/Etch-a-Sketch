import { useEffect, useState } from 'react';
import GridSizeButton from '@/components/GridSizeButton';
import styles from './Header.module.css';
import useScrollDirection from '@/hooks';
import { Typography } from '@mui/material';
import getRandomColor from '@/utils';

type HeaderProps = {
	onSetGridSize: (size: number) => void;
};

export default function Header({ onSetGridSize }: HeaderProps) {
	const [color, setColor] = useState('black');
	const { scrollDirection, isAtTop } = useScrollDirection();

	useEffect(() => {
		const interval = setInterval(() => {
			setColor(getRandomColor());
		}, 1500);

		return () => clearInterval(interval);
	}, []);

	const headerClasses = `
        ${styles.header} 
        ${scrollDirection === 'down' && !isAtTop ? styles.hidden : ''}
        ${isAtTop ? styles.atTop : ''}
    `.trim();

	return (
		<header className={headerClasses}>
			<div className={styles.container}>
				<Typography variant="h4" component="h1" color={color}>
					Etch-a-Sketch
				</Typography>
				<GridSizeButton onSetGridSize={onSetGridSize} />
			</div>
		</header>
	);
}
