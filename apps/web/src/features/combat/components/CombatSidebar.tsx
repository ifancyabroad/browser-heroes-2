import { CLASSES_BY_ID, type ClassId } from "@app/content";
import type { ActiveCombatEffect, CombatLogEntry, HeroProgressionView } from "@app/engine";
import { ResourceBar } from "../../../components/ResourceBar";
import { Sidebar } from "../../../components/Sidebar";
import { getXpResource } from "../../../game/resourceDisplay";
import { CombatLogPanel } from "./CombatLogPanel";
import { ActiveEffectsRow } from "./ActiveEffectsRow";

type CombatSidebarProps = {
	open: boolean;
	onClose: () => void;
	heroName: string;
	heroClassId: ClassId;
	heroLevel: number;
	currentHp: number;
	maxHp: number;
	progression: HeroProgressionView;
	activeEffects: ActiveCombatEffect[];
	goldMultiplier: number;
	battleNumber: number;
	turnNumber: number;
	zoneLabel: string;
	entries: CombatLogEntry[];
};

export function CombatSidebar({
	open,
	onClose,
	heroName,
	heroClassId,
	heroLevel,
	currentHp,
	maxHp,
	progression,
	activeEffects,
	goldMultiplier,
	battleNumber,
	turnNumber,
	zoneLabel,
	entries,
}: CombatSidebarProps) {
	const heroClass = CLASSES_BY_ID[heroClassId];
	const xpResource = getXpResource(progression);
	const heroTitle = `${heroName} the ${heroClass.name} / Level ${heroLevel}`;

	return (
		<Sidebar
			open={open}
			onClose={onClose}
			aria-label="Combat details"
			className="flex flex-col"
			title={
				<div className="grid gap-2 text-base">
					<h2 className="truncate text-base" title={heroTitle}>
						<span className="text-primary">
							{heroName} the {heroClass.name}
						</span>{" "}
						/ Level {heroLevel}
					</h2>

					<section className="grid gap-2" aria-label="Hero resources">
						<ResourceBar
							label="HP"
							value={`${currentHp}/${maxHp}`}
							tone="hp"
							fillPercent={(currentHp / maxHp) * 100}
						/>
						<ResourceBar
							label="XP"
							value={xpResource.value}
							tone="xp"
							fillPercent={xpResource.fillPercent}
						/>
						<ActiveEffectsRow effects={activeEffects} label="Hero active effects" />
					</section>
				</div>
			}
			contentClassName="flex min-h-0 flex-1 flex-col gap-4 pt-2"
		>
			<CombatRunInfo
				battleNumber={battleNumber}
				goldMultiplier={goldMultiplier}
				turnNumber={turnNumber}
				zoneLabel={zoneLabel}
			/>
			<section
				className="flex min-h-0 flex-1 flex-col gap-3 border border-text-muted bg-bg-elevated p-3"
				aria-label="Combat log"
			>
				<h2 className="border-b border-text-muted pb-2 text-base">Combat Log</h2>
				<CombatLogPanel entries={entries} className="min-h-0 flex-1" />
			</section>
		</Sidebar>
	);
}

type CombatRunInfoProps = {
	battleNumber: number;
	goldMultiplier: number;
	turnNumber: number;
	zoneLabel: string;
};

function CombatRunInfo({
	battleNumber,
	goldMultiplier,
	turnNumber,
	zoneLabel,
}: CombatRunInfoProps) {
	const runItems = [
		{ label: "Zone", value: zoneLabel },
		{ label: "Battle", value: battleNumber },
		{ label: "Turn", value: turnNumber },
		{ label: "Gold", value: `${goldMultiplier}x` },
	];

	return (
		<section aria-label="Combat">
			<dl className="flex flex-wrap items-center gap-x-5 gap-y-1 text-base">
				{runItems.map((item) => (
					<div key={item.label} className="flex items-center gap-2">
						<dt className="text-text-label">{item.label}</dt>
						<dd>{item.value}</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
