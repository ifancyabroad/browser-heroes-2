import type { ReactNode } from "react";
import { IconHelpCircle, IconHome, IconScript } from "@tabler/icons-react";
import { ButtonLink, IconButton } from "./Button";
import { Tooltip } from "./Tooltip";
import { useSidebarStore } from "../stores/sidebarStore";
import { useHowToPlayModalStore } from "../features/howToPlay";

type GameNavigationProps = {
	actions: ReactNode;
	children?: ReactNode;
};

export function GameNavigation({ actions, children }: GameNavigationProps) {
	const isSidebarOpen = useSidebarStore((state) => state.isOpen);
	const openSidebar = useSidebarStore((state) => state.open);
	return (
		<nav
			aria-label="Game navigation"
			className="flex flex-wrap items-center justify-between gap-3"
		>
			<div className="flex items-center gap-1">
				<NavigationTooltip label="Hero" className="lg:hidden">
					<IconButton
						type="button"
						variant="primary"
						aria-label="Hero"
						aria-expanded={isSidebarOpen}
						onClick={openSidebar}
					>
						<IconScript aria-hidden="true" className="h-6 w-6" />
					</IconButton>
				</NavigationTooltip>
				{actions}
			</div>
			{children}
		</nav>
	);
}

export function DefaultGameNavigationActions() {
	const openHowToPlay = useHowToPlayModalStore((state) => state.open);
	return (
		<>
			<NavigationTooltip label="Home">
				<ButtonLink to="/" aria-label="Home" className="h-9 w-9 p-0!">
					<IconHome aria-hidden="true" className="h-6 w-6 shrink-0" />
				</ButtonLink>
			</NavigationTooltip>
			<NavigationTooltip label="How to play">
				<IconButton type="button" aria-label="How to play" onClick={openHowToPlay}>
					<IconHelpCircle aria-hidden="true" className="h-6 w-6" />
				</IconButton>
			</NavigationTooltip>
		</>
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
