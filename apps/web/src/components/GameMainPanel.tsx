import type { ReactNode } from "react";
import clsx from "clsx";

type GameMainPanelProps = {
	children: ReactNode;
	actions: ReactNode;
	header?: ReactNode;
	contentClassName?: string;
};

export function GameMainPanel({ children, actions, header, contentClassName }: GameMainPanelProps) {
	return (
		<section className="flex min-w-0 flex-1 flex-col overflow-hidden">
			{header && (
				<header className="shrink-0 px-4 py-3 md:px-6 md:py-4">
					<div className="mx-auto w-full max-w-6xl">{header}</div>
				</header>
			)}

			<div className="min-h-0 flex-1 overflow-y-auto">
				<div
					className={clsx(
						"mx-auto flex h-full w-full max-w-6xl flex-col px-4 py-3 md:px-6 md:py-4",
						header && "md:pt-0",
					)}
				>
					<div className={contentClassName}>{children}</div>

					<div className="sticky bottom-0 z-20 shrink-0 py-3">{actions}</div>
				</div>
			</div>
		</section>
	);
}
