import type { PropsWithChildren, ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = PropsWithChildren<{
	open: boolean;
	title: string;
	onClose: () => void;
	footer?: ReactNode;
	closeOnBackdropClick?: boolean;
}>;

export function Modal({
	open,
	title,
	onClose,
	footer,
	closeOnBackdropClick = true,
	children,
}: ModalProps) {
	if (!open) {
		return null;
	}

	return createPortal(
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
			onMouseDown={(event) => {
				if (closeOnBackdropClick && event.target === event.currentTarget) {
					onClose();
				}
			}}
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-title"
				className="border-2 border-border bg-bg-elevated w-full max-w-md p-6"
			>
				<header className="mb-4 flex items-center justify-between">
					<h2 id="modal-title" className="text-text-bright">
						{title}
					</h2>
				</header>

				<div>{children}</div>

				{footer && <footer className="mt-6 flex justify-end gap-4">{footer}</footer>}
			</div>
		</div>,
		document.body,
	);
}
