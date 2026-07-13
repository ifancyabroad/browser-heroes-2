import type { PropsWithChildren, ReactNode } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { TerminalPanelTitle } from "./TerminalPrimitives";

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
			className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
			onMouseDown={(event) => {
				if (closeOnBackdropClick && event.target === event.currentTarget) {
					onClose();
				}
			}}
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-label={title}
				className={clsx(
					"relative w-full max-w-md border-2 border-border bg-bg-elevated",
					className,
				)}
			>
				<header>
					<TerminalPanelTitle title={title} />
				</header>

				<div className="p-4">{children}</div>

				{footer && (
					<footer className="flex justify-end gap-4 border-t border-border px-4 py-3">
						{footer}
					</footer>
				)}
			</div>
		</div>,
		document.body,
	);
}
