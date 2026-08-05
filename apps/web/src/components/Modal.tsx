import { useCallback, useRef, useState, type PropsWithChildren, type ReactNode } from "react";
import { Dialog } from "radix-ui";
import clsx from "clsx";
import { OverlayPortalProvider } from "../contexts/OverlayPortalContext";
import { PanelTitle } from "./PanelTitle";

type ModalProps = PropsWithChildren<{
	open: boolean;
	title: string;
	onClose: () => void;
	footer?: ReactNode;
	dismissible?: boolean;
	size?: keyof typeof modalSizeClassNames;
	className?: string;
}>;

const modalSizeClassNames = {
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl",
	"5xl": "max-w-5xl",
} as const;

export function Modal({
	open,
	title,
	onClose,
	footer,
	dismissible = true,
	size = "md",
	className,
	children,
}: ModalProps) {
	const contentRef = useRef<HTMLDivElement>(null);
	const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);
	const setContentRef = useCallback((node: HTMLDivElement | null) => {
		contentRef.current = node;
		setPortalContainer(node);
	}, []);

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
					ref={setContentRef}
					tabIndex={-1}
					onOpenAutoFocus={(event) => {
						event.preventDefault();
						contentRef.current?.focus();
					}}
					onEscapeKeyDown={preventDismiss}
					onPointerDownOutside={preventDismiss}
					className={clsx(
						"fixed inset-0 z-50 m-auto flex h-fit max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] flex-col border-2 border-border bg-bg-elevated outline-none",
						modalSizeClassNames[size],
						className,
					)}
				>
					<OverlayPortalProvider container={portalContainer}>
						<header>
							<Dialog.Title asChild>
								<PanelTitle title={title} align="center" />
							</Dialog.Title>
						</header>

						<div className="min-h-0 overflow-y-auto px-4 pb-4 pt-6">{children}</div>

						{footer && (
							<footer className="flex shrink-0 flex-wrap justify-end gap-4 px-4 pb-4 pt-2">
								{footer}
							</footer>
						)}
					</OverlayPortalProvider>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
