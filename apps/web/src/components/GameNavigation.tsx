import type { ReactNode } from "react";
import { IconHelpCircle, IconHome, IconScript, IconWorld } from "@tabler/icons-react";
import { ButtonLink, IconButton } from "./Button";
import { Tooltip } from "./Tooltip";

type GameNavigationProps = {
	label: string;
	activeSidebar: "hero" | "world" | null;
	onOpenSidebar: (sidebar: "hero" | "world") => void;
	onHowToPlay: () => void;
	children?: ReactNode;
};

export function GameNavigation({
	label,
	activeSidebar,
	onOpenSidebar,
	onHowToPlay,
	children,
}: GameNavigationProps) {
	return (
		<nav aria-label={label} className="flex flex-wrap items-center justify-between gap-3">
			<div className="flex items-center gap-1">
				<NavigationTooltip label="Hero" className="lg:hidden">
					<IconButton
						type="button"
						variant="primary"
						aria-label="Hero"
						aria-expanded={activeSidebar === "hero"}
						onClick={() => onOpenSidebar("hero")}
					>
						<IconScript aria-hidden="true" className="h-6 w-6" />
					</IconButton>
				</NavigationTooltip>
				<NavigationTooltip label="World Log" className="2xl:hidden">
					<IconButton
						type="button"
						aria-label="World Log"
						aria-expanded={activeSidebar === "world"}
						onClick={() => onOpenSidebar("world")}
					>
						<IconWorld aria-hidden="true" className="h-6 w-6" />
					</IconButton>
				</NavigationTooltip>
				<NavigationTooltip label="Home">
					<ButtonLink to="/" aria-label="Home" className="h-9 w-9 p-0!">
						<IconHome aria-hidden="true" className="h-6 w-6 shrink-0" />
					</ButtonLink>
				</NavigationTooltip>
				<NavigationTooltip label="How to play">
					<IconButton type="button" aria-label="How to play" onClick={onHowToPlay}>
						<IconHelpCircle aria-hidden="true" className="h-6 w-6" />
					</IconButton>
				</NavigationTooltip>
			</div>
			{children}
		</nav>
	);
}

function NavigationTooltip({
	label,
	className,
	children,
}: {
	label: string;
	className?: string;
	children: ReactNode;
}) {
	return (
		<Tooltip
			content={label}
			placement="bottom"
			className={className}
			referenceTabIndex={null}
			mobileBehavior="disabled"
		>
			{children}
		</Tooltip>
	);
}
