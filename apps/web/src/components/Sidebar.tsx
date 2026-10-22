import { useEffect, type PropsWithChildren } from "react";
import clsx from "clsx";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Drawer } from "./Drawer";

type SidebarProps = PropsWithChildren<{
	open: boolean;
	onClose: () => void;
	className?: string;
	"aria-label": string;
}>;

export function Sidebar({ open, onClose, children, className, "aria-label": label }: SidebarProps) {
	const desktop = useMediaQuery("(min-width: 1024px)");

	useEffect(() => {
		if (desktop && open) {
			onClose();
		}
	}, [desktop, open, onClose]);

	if (!desktop) {
		return (
			<Drawer open={open} onClose={onClose} label={label} className={className}>
				{children}
			</Drawer>
		);
	}

	return (
		<>
			<div aria-hidden="true" className="w-96 shrink-0" />
			<aside
				aria-label={label}
				className={clsx(
					"fixed inset-y-0 z-50 flex h-dvh w-96 flex-col overflow-y-auto bg-bg-base",
					"left-0 border-r-2",
					className,
				)}
			>
				{children}
			</aside>
		</>
	);
}
