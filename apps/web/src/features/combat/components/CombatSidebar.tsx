import { CLASSES_BY_ID, type ClassId } from "@app/content";
import type { ActiveCombatEffect, CombatLogEntry, HeroProgressionView } from "@app/engine";
import { ResourceBar } from "../../../components/ResourceBar";
import { Sidebar } from "../../../components/Sidebar";
import { SectionHeading } from "../../../components/SectionHeading";
import { getXpResource } from "../../../presentation/resources";
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
	gold: number;
	goldMultiplier: number;
	battleNumber: number;
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
	gold,
	goldMultiplier,
	battleNumber,
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
							animateChanges
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
			contentClassName="flex min-h-0 flex-1 flex-col gap-4"
		>
			<CombatRunInfo
				battleNumber={battleNumber}
				gold={gold}
				goldMultiplier={goldMultiplier}
				zoneLabel={zoneLabel}
			/>
			<section
				className="flex min-h-0 flex-1 flex-col gap-3 border-2 border-border-secondary bg-bg-panel p-3"
				aria-label="Combat log"
			>
				<SectionHeading title="Combat Log" />
				<CombatLogPanel entries={entries} className="min-h-0 flex-1" />
			</section>
		</Sidebar>
	);
}

type CombatRunInfoProps = {
	battleNumber: number;
	gold: number;
	goldMultiplier: number;
	zoneLabel: string;
};

function CombatRunInfo({ battleNumber, gold, goldMultiplier, zoneLabel }: CombatRunInfoProps) {
	const runItems = [
		{ label: "Zone", value: zoneLabel },
		{ label: "Battle", value: battleNumber },
		{ label: "Gold", value: gold },
		{ label: "Multiplier", value: `${goldMultiplier}x` },
	];

	return (
		<section aria-label="Combat">
			<dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-base">
				{runItems.map((item) => (
					<div key={item.label} className="grid grid-cols-[5rem_minmax(0,1fr)] gap-2">
						<dt className="text-text-label">{item.label}</dt>
						<dd className="min-w-0 truncate text-text-bright">{item.value}</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
