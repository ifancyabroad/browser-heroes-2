import type { CombatLogEntry } from "@app/engine";
import clsx from "clsx";
import type { ReactNode } from "react";
import { Tabs } from "../../../components/Tabs";
import { CombatLogPanel } from "./CombatLogPanel";

type CombatViewTab = "log" | "portrait";

const combatViewTabs = [
	{ label: "Combat Log", value: "log" },
	{ label: "Portrait", value: "portrait" },
] as const;

type BattlefieldProps = {
	activeTab: CombatViewTab;
	onTabChange: (tab: CombatViewTab) => void;
	heroPortrait: string;
	heroName: string;
	enemyPortrait: string | null;
	enemyName: string;
	logEntries: CombatLogEntry[];
};

export function Battlefield({
	activeTab,
	onTabChange,
	heroPortrait,
	heroName,
	enemyPortrait,
	enemyName,
	logEntries,
}: BattlefieldProps) {
	return (
		<>
			<section
				className="hidden min-h-0 flex-1 grid-cols-2 gap-6 md:grid"
				aria-label="Battlefield"
			>
				<PortraitStage
					image={heroPortrait}
					alt={heroName}
					className="aspect-[4/3] min-h-80"
				/>

				<PortraitStage
					image={enemyPortrait}
					alt={enemyName}
					className="aspect-[4/3] min-h-80"
				>
					<CombatViewTabs
						activeTab={activeTab}
						onTabChange={onTabChange}
						className="absolute left-3 right-3 top-3 z-10 justify-center"
					/>
					<CombatLogOverlay active={activeTab === "log"} entries={logEntries} />
				</PortraitStage>
			</section>

			<section className="md:hidden" aria-label="Battlefield">
				<PortraitStage
					image={enemyPortrait}
					alt={enemyName}
					className="aspect-[4/3] w-full max-w-full"
				>
					<CombatViewTabs
						activeTab={activeTab}
						onTabChange={onTabChange}
						className="absolute left-3 right-3 top-3 z-10 justify-center"
					/>
					<CombatLogOverlay active={activeTab === "log"} entries={logEntries} />
				</PortraitStage>
			</section>
		</>
	);
}

type CombatLogOverlayProps = {
	active: boolean;
	entries: CombatLogEntry[];
};

function CombatLogOverlay({ active, entries }: CombatLogOverlayProps) {
	if (!active) {
		return null;
	}

	return (
		<div className="absolute inset-0 z-0 flex flex-col bg-bg-base/70 pt-12">
			<CombatLogPanel entries={entries} className="min-h-0 flex-1" />
		</div>
	);
}

type CombatViewTabsProps = {
	activeTab: CombatViewTab;
	onTabChange: (tab: CombatViewTab) => void;
	className?: string;
};

function CombatViewTabs({ activeTab, onTabChange, className }: CombatViewTabsProps) {
	return (
		<Tabs
			aria-label="Combat view"
			items={combatViewTabs}
			value={activeTab}
			onChange={onTabChange}
			className={className}
		/>
	);
}

type PortraitStageProps = {
	image: string | null;
	alt: string;
	children?: ReactNode;
	className?: string;
	imageClassName?: string;
};

function PortraitStage({ image, alt, children, className, imageClassName }: PortraitStageProps) {
	return (
		<div className={clsx("relative min-h-0 min-w-0 overflow-hidden bg-bg-base", className)}>
			{image && (
				<img
					src={image}
					alt={alt}
					loading="lazy"
					className={clsx(
						"absolute inset-0 h-full w-full object-contain",
						imageClassName,
					)}
				/>
			)}
			{children}
		</div>
	);
}
