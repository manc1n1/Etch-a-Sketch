import { useEffect, useRef } from 'react';
import styles from './Grid.module.css';
import getRandomColor from '@/utils';

type GridProps = {
	gridSize: number;
};

export default function Grid({ gridSize }: GridProps) {
	const gridContainerRef = useRef<HTMLDivElement>(null);

	const resetGrid = () => {
		if (gridContainerRef.current) {
			const gridItems =
				gridContainerRef.current.querySelectorAll<HTMLDivElement>(
					`.${styles.gridItem}`,
				);

			gridItems.forEach((item) => {
				item.style.backgroundColor = '#fff';
				item.style.opacity = '0';
				item.dataset.opacity = '0';
			});
		}
	};

	useEffect(() => {
		resetGrid();
	}, [gridSize]);

	const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
		let currentOpacity = parseFloat(e.currentTarget.dataset.opacity || '0');

		if (currentOpacity < 1) {
			currentOpacity = Math.min(currentOpacity + 0.1, 1);
			e.currentTarget.dataset.opacity = currentOpacity.toString();

			const randomColor = getRandomColor();
			e.currentTarget.style.backgroundColor = `${randomColor}`;
			e.currentTarget.style.opacity = currentOpacity.toString();
		}
	};

	return (
		<>
			<div
				ref={gridContainerRef}
				className={styles.gridContainer}
				style={{
					gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
					gridTemplateRows: `repeat(${gridSize}, 1fr)`,
				}}
			>
				{Array.from({ length: gridSize * gridSize }).map((_, index) => (
					<div
						key={index}
						className={styles.gridItem}
						data-opacity="0"
						onMouseOver={handleMouseOver}
					/>
				))}
			</div>
		</>
	);
}
