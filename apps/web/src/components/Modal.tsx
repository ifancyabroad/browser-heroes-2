import type { PropsWithChildren, ReactNode } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

type ModalProps = PropsWithChildren<{
	open: boolean;
	title: string;
	onClose: () => void;
	footer?: ReactNode;
	closeOnBackdropClick?: boolean;
	className?: string;
}>;

export function Modal({
	open,
	title,
	onClose,
	footer,
	closeOnBackdropClick = true,
	className,
	children,
}: ModalProps) {
	if (!open) {
		return null;
	}

	return createPortal(
		<div
			className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
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
				className={clsx(
					"w-full max-w-md border-2 border-border bg-bg-elevated p-6",
					className,
				)}
			>
				<header className="mb-4 flex items-center justify-between">
					<h2 id="modal-title">{title}</h2>
				</header>

				<div>{children}</div>

				{footer && <footer className="mt-6 flex justify-end gap-4">{footer}</footer>}
			</div>
		</div>,
		document.body,
	);
}
