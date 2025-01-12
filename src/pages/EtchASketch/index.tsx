import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Grid from '@/components/Grid';
import styles from './EtchASketch.module.css';
import getRandomColor from '@/utils';

type ContextType = {
	gridSize: number;
};

export default function EtchASketch() {
	const { gridSize } = useOutletContext<ContextType>();
	const [bgColor, setBgColor] = useState('white');

	useEffect(() => {
		const interval = setInterval(() => {
			setBgColor(getRandomColor());
		}, 1500);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={styles.container}>
			<Grid gridSize={gridSize} />
			<div
				className={styles.space}
				style={{ backgroundColor: bgColor }}
			></div>
		</div>
	);
}
