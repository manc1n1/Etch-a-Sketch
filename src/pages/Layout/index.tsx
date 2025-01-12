import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import styles from './Layout.module.css';
import { DEFAULT_GRID_SIZE } from '@/constants';

export default function Layout() {
	const [gridSize, setGridSize] = useState<number>(DEFAULT_GRID_SIZE);

	const handleSetGridSize = (size: number) => {
		setGridSize(size);
	};

	return (
		<>
			<main className={styles.main}>
				<Outlet context={{ gridSize }} />
			</main>
			<NavBar onSetGridSize={handleSetGridSize} />
		</>
	);
}
