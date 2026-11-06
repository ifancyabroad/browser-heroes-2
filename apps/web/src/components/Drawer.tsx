import { useRef, useState, type PropsWithChildren } from "react";
import { Dialog } from "radix-ui";
import { IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { OverlayPortalProvider } from "../contexts/OverlayPortalContext";
import { IconButton } from "./Button";
import styles from "./Drawer.module.css";

type DrawerProps = PropsWithChildren<{
	open: boolean;
	onClose: () => void;
	className?: string;
	label: string;
}>;

export function Drawer({ open, onClose, label, children, className }: DrawerProps) {
	const returnFocusRef = useRef<HTMLElement | null>(null);
	const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);

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
				<Dialog.Overlay
					className={clsx(styles.overlay, "fixed inset-0 z-40 bg-black/50")}
				/>
				<Dialog.Content
					ref={setPortalContainer}
					aria-describedby={undefined}
					className={clsx(
						styles.panel,
						"fixed inset-y-0 z-50 flex h-dvh w-96 max-w-full flex-col overflow-y-auto bg-bg-base outline-none",
						"left-0 border-r-2",
						className,
					)}
					onOpenAutoFocus={() => {
						returnFocusRef.current = document.activeElement as HTMLElement;
					}}
					onCloseAutoFocus={(event) => {
						event.preventDefault();
						returnFocusRef.current?.focus();
					}}
				>
					<Dialog.Title className="sr-only">{label}</Dialog.Title>
					<Dialog.Close asChild>
						<IconButton
							aria-label="Close sidebar"
							type="button"
							className="absolute right-4 top-3"
						>
							<IconX aria-hidden="true" className="h-6 w-6" />
						</IconButton>
					</Dialog.Close>
					<OverlayPortalProvider container={portalContainer}>
						{children}
					</OverlayPortalProvider>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
