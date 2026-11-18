import type { ReactNode } from "react";
import {
	IconChartBar,
	IconHelpCircle,
	IconHome,
	IconScript,
	IconShirt,
	IconWand,
} from "@tabler/icons-react";
import { IconButton, IconButtonLink } from "./Button";
import { Tooltip } from "./Tooltip";
import { useGameModalStore } from "../stores/gameModalStore";

type GameNavigationProps = {
	showCombatLog?: boolean;
	children?: ReactNode;
};

const heroButtons = [
	{ modal: "stats", label: "Hero stats", icon: IconChartBar },
	{ modal: "equipment", label: "Equipment", icon: IconShirt },
	{ modal: "skills", label: "Skills and feats", icon: IconWand },
] as const;

export function GameNavigation({ showCombatLog = false, children }: GameNavigationProps) {
	const activeModal = useGameModalStore((state) => state.modal);
	const open = useGameModalStore((state) => state.open);
	return (
		<nav
			aria-label="Game navigation"
			className="flex flex-wrap items-center justify-between gap-3"
		>
			<div className="flex items-center gap-1">
				{heroButtons.map(({ modal, label, icon: Icon }) => (
					<NavigationTooltip key={modal} label={label}>
						<IconButton
							type="button"
							aria-label={label}
							aria-haspopup="dialog"
							aria-expanded={activeModal === modal}
							onClick={() => open(modal)}
						>
							<Icon aria-hidden="true" className="size-6" />
						</IconButton>
					</NavigationTooltip>
				))}
				{showCombatLog && (
					<NavigationTooltip label="Combat Log">
						<IconButton
							type="button"
							aria-label="Combat Log"
							aria-haspopup="dialog"
							aria-expanded={activeModal === "combatLog"}
							onClick={() => open("combatLog")}
						>
							<IconScript aria-hidden="true" className="size-6" />
						</IconButton>
					</NavigationTooltip>
				)}
				<NavigationTooltip label="Home">
					<IconButtonLink to="/" aria-label="Home">
						<IconHome aria-hidden="true" className="size-6" />
					</IconButtonLink>
				</NavigationTooltip>
				<NavigationTooltip label="How to play">
					<IconButton
						type="button"
						aria-label="How to play"
						aria-haspopup="dialog"
						aria-expanded={activeModal === "howToPlay"}
						onClick={() => open("howToPlay")}
					>
						<IconHelpCircle aria-hidden="true" className="size-6" />
					</IconButton>
				</NavigationTooltip>
			</div>
			{children}
		</nav>
	);
}

function NavigationTooltip({ label, children }: { label: string; children: ReactNode }) {
	return (
		<Tooltip
			content={label}
			placement="bottom"
			referenceTabIndex={null}
			mobileBehavior="disabled"
		>
			{children}
		</Tooltip>
	);
}
