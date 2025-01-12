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

	const handleMouseOver = (
		e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
	) => {
		let target: HTMLDivElement;

		if ('touches' in e) {
			const touch = e.touches[0];
			target = document.elementFromPoint(
				touch.clientX,
				touch.clientY,
			) as HTMLDivElement;
		} else {
			target = e.currentTarget;
		}

		if (target && target.classList.contains(styles.gridItem)) {
			let currentOpacity = parseFloat(target.dataset.opacity || '0');

			if (currentOpacity < 1) {
				currentOpacity = Math.min(currentOpacity + 0.1, 1);
				target.dataset.opacity = currentOpacity.toString();

				const randomColor = getRandomColor();
				target.style.backgroundColor = randomColor;
				target.style.opacity = currentOpacity.toString();
			}
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
					touchAction: 'none',
				}}
			>
				{Array.from({ length: gridSize * gridSize }).map((_, index) => (
					<div
						key={index}
						className={styles.gridItem}
						data-opacity="0"
						onMouseOver={handleMouseOver}
						onTouchStart={handleMouseOver}
						onTouchMove={handleMouseOver}
					/>
				))}
			</div>
		</>
	);
}
