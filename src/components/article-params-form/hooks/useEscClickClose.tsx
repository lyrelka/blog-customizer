import { useEffect } from 'react';

type useEscClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useEscClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: useEscClickClose) => {
	useEffect(() => {
		const handleEscClick = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		window.addEventListener('keydown', handleEscClick);

		return () => {
			window.removeEventListener('keydown', handleEscClick);
		};
	}, [onClose, onChange, isOpen]);
};
