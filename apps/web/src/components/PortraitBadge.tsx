import type { ReactNode } from "react";

export function PortraitBadge({ children, label }: { children: ReactNode; label: string }) {
	return (
		<span
			role="img"
			aria-label={label}
			title={label}
			className="inline-flex shrink-0 [&>svg]:h-4 [&>svg]:w-4"
		>
			{children}
		</span>
	);
}
