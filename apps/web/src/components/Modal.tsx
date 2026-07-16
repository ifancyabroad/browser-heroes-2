import type { PropsWithChildren, ReactNode } from "react";
import { Dialog } from "radix-ui";
import clsx from "clsx";
import { PanelTitle } from "./PanelTitle";

type ModalProps = PropsWithChildren<{
	open: boolean;
	title: string;
	onClose: () => void;
	footer?: ReactNode;
	dismissible?: boolean;
	className?: string;
}>;

export function Modal({
	open,
	title,
	onClose,
	footer,
	dismissible = true,
	className,
	children,
}: ModalProps) {
	function preventDismiss(event: Event) {
		if (!dismissible) {
			event.preventDefault();
		}
	}

	return (
		<Dialog.Root
			open={open}
			onOpenChange={(nextOpen) => {
				if (!nextOpen) {
					onClose();
				}
			}}
		>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-50 bg-black/70" />
				<Dialog.Content
					onEscapeKeyDown={preventDismiss}
					onPointerDownOutside={preventDismiss}
					className={clsx(
						"fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col border-2 border-border bg-bg-elevated outline-none",
						className,
					)}
				>
					<header>
						<Dialog.Title asChild>
							<PanelTitle title={title} align="center" />
						</Dialog.Title>
					</header>

					<div className="min-h-0 overflow-y-auto px-4 pb-4 pt-6">{children}</div>

					{footer && (
						<footer className="flex shrink-0 flex-wrap justify-end gap-4 px-4 pb-4">
							{footer}
						</footer>
					)}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
