import { useState, useEffect } from 'react';

export default function useScrollDirection() {
	const [scrollDirection, setScrollDirection] = useState('up');
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isAtTop, setIsAtTop] = useState(true);

	useEffect(() => {
		const scrollThreshold = 10;

		let timeoutId: NodeJS.Timeout;

		const handleScroll = () => {
			clearTimeout(timeoutId);

			timeoutId = setTimeout(() => {
				const currentScrollY = window.scrollY;

				setIsAtTop(currentScrollY < scrollThreshold);

				if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
					const newDirection =
						currentScrollY > lastScrollY ? 'down' : 'up';
					setScrollDirection(newDirection);
					setLastScrollY(currentScrollY);
				}
			}, 50);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener('scroll', handleScroll);
		};
	}, [lastScrollY]);

	return { scrollDirection, isAtTop };
}
