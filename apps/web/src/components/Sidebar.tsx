import type { PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";

type SidebarProps = PropsWithChildren<{
	open: boolean;
	onClose: () => void;
	title?: ReactNode;
	className?: string;
	contentClassName?: string;
	widthClassName?: string;
	"aria-label"?: string;
}>;

const DEFAULT_SIDEBAR_WIDTH_CLASS = "w-96";

export function Sidebar({
	open,
	onClose,
	title,
	className,
	contentClassName,
	widthClassName = DEFAULT_SIDEBAR_WIDTH_CLASS,
	children,
	"aria-label": ariaLabel = "Sidebar",
}: SidebarProps) {
	return (
		<>
			<div
				onClick={onClose}
				className={`fixed inset-0 z-40 bg-black/50 md:hidden ${open ? "block" : "hidden"}`}
			/>

			<div aria-hidden="true" className={clsx("hidden shrink-0 md:block", widthClassName)} />

			<aside
				aria-label={ariaLabel}
				className={clsx(
					"fixed inset-y-0 left-0 z-50",
					"h-dvh max-h-dvh max-w-full overflow-y-auto border-r-2 border-border bg-bg-base",
					"transform transition-transform duration-200",
					open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
					widthClassName,
					className,
				)}
			>
				<header className="border-b-2 border-border bg-bg-base">
					<div className="flex items-start justify-between gap-4 px-4 py-3 text-base">
						<div className="min-w-0 flex-1">{title}</div>

						<button
							onClick={onClose}
							className="border-2 border-border bg-bg-elevated p-1 text-text-muted hover:border-primary hover:text-text-bright md:hidden"
							aria-label="Close sidebar"
							type="button"
						>
							<svg
								className="h-4 w-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</header>

				<div className={clsx("px-4 py-3 text-base", contentClassName)}>{children}</div>
			</aside>
		</>
	);
}

export default Sidebar;
