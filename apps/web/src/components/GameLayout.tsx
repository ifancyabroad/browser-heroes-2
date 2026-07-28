import type { PropsWithChildren } from "react";

export function GameLayout({ children }: PropsWithChildren) {
	return (
		<main className="flex h-dvh min-h-0 overflow-hidden bg-bg-base text-base text-text">
			{children}
		</main>
	);
}
