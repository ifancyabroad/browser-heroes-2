import type { ReactNode } from "react";

type GameMainPanelProps = {
	children: ReactNode;
	actions: ReactNode;
	mobileHeader?: ReactNode;
	contentClassName?: string;
};

export function GameMainPanel({
	children,
	actions,
	mobileHeader,
	contentClassName,
}: GameMainPanelProps) {
	return (
		<section className="flex min-w-0 flex-1 flex-col overflow-hidden">
			{mobileHeader && (
				<header className="shrink-0 px-4 py-3 md:hidden">{mobileHeader}</header>
			)}

			<div className="min-h-0 flex-1 overflow-y-auto">
				<div className="mx-auto flex h-full w-full max-w-6xl flex-col px-4 py-3 md:px-6 md:py-4">
					<div className={contentClassName}>{children}</div>

					<div className="sticky bottom-0 z-20 shrink-0 py-3">{actions}</div>
				</div>
			</div>
		</section>
	);
}
