import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './Layout.module.css';
import { DEFAULT_GRID_SIZE } from '@/constants';

export default function Layout() {
	const [gridSize, setGridSize] = useState<number>(DEFAULT_GRID_SIZE);

	const handleSetGridSize = (size: number) => {
		setGridSize(size);
	};

	return (
		<>
			<Header onSetGridSize={handleSetGridSize} />
			<main className={styles.main}>
				<section className={styles.section}>
					<Outlet context={{ gridSize }} />
				</section>
			</main>
			<Footer />
		</>
	);
}
