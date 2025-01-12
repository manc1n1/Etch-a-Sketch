import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import getRandomColor from '@/utils';

type GridSizeButtonProps = {
	onSetGridSize: (size: number) => void;
};

export default function GridSizeButton({ onSetGridSize }: GridSizeButtonProps) {
	const [color, setColor] = useState('');

	useEffect(() => {
		const interval = setInterval(() => {
			setColor(getRandomColor());
		}, 1500);

		return () => clearInterval(interval);
	}, []);

	const handleClick = () => {
		const size = prompt('Enter desired grid size (1-100):');
		if (size) {
			const newSize = parseInt(size, 10);
			if (!isNaN(newSize) && newSize > 0 && newSize < 101) {
				onSetGridSize(newSize);
			} else {
				alert('Please enter a valid number between 1 and 100.');
			}
		}
	};

	return (
		<Button
			variant="contained"
			size="large"
			sx={{ backgroundColor: color }}
			onClick={handleClick}
		>
			Grid Size
		</Button>
	);
}
