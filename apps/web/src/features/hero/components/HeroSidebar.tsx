import { CLASSES_BY_ID } from "@app/content";
import { selectHeroProgression, selectHeroView } from "@app/engine";
import type { RunView } from "@app/shared";
import { IconChartBar, IconSword, IconSparkles, IconScript, IconWorld } from "@tabler/icons-react";
import { ActiveEffectsRow } from "../../combat/components/ActiveEffectsRow";
import { CombatLogPanel } from "../../combat/components/CombatLogPanel";
import { LogPanel } from "../../../components/LogPanel";
import { useWorldLog, WorldLogPanel } from "../../worldLog";
import { useState } from "react";
import { Sidebar } from "../../../components/Sidebar";
import { ResourceBar } from "../../../components/ResourceBar";
import { getXpResource } from "../../../presentation/resources";
import { formatTitle } from "../../../presentation/effects";
import { Tabs } from "../../../components/Tabs";
import { HeroDetailsTab } from "./HeroDetailsTab";
import { HeroEquipmentTab } from "./HeroEquipmentTab";
import { HeroSkillsTab } from "./HeroSkillsTab";

type HeroSidebarProps = {
	run: RunView;
	open: boolean;
	canSwapWeapons?: boolean;
	isPending: boolean;
	onClose: () => void;
	onSwapWeapons?: () => void;
};

type HeroSidebarTab = "details" | "equipment" | "skills" | "combat" | "world";

const sharedTabs = [
	{ label: "Equipment", value: "equipment", icon: <IconSword className="h-6 w-6" /> },
	{ label: "Skills", value: "skills", icon: <IconSparkles className="h-6 w-6" /> },
	{ label: "World Log", value: "world", icon: <IconWorld className="h-6 w-6" /> },
] as const;

export function HeroSidebar({
	run,
	open,
	canSwapWeapons,
	isPending,
	onClose,
	onSwapWeapons,
}: HeroSidebarProps) {
	const { state } = run;
	const { combat } = state;
	const isCombat = combat !== null;
	const [activeTab, setActiveTab] = useState<HeroSidebarTab>(isCombat ? "combat" : "details");

	const heroView = selectHeroView(state.hero);
	const worldLog = useWorldLog();
	const heroSidebarTabs = [
		isCombat
			? {
					label: "Combat Log",
					value: "combat" as const,
					icon: <IconScript className="h-6 w-6" />,
				}
			: {
					label: "Stats",
					value: "details" as const,
					icon: <IconChartBar className="h-6 w-6" />,
				},
		...sharedTabs,
	];
	const heroClass = CLASSES_BY_ID[heroView.classId];
	const progression = selectHeroProgression(state);
	const xpResource = getXpResource(progression);
	const health = combat?.player ?? heroView.health;
	const heroTitle = `${heroView.name} the ${heroClass.name} / Level ${heroView.level}`;

	return (
		<Sidebar className="border-border" open={open} onClose={onClose} aria-label="Hero details">
			<header className="shrink-0 border-b-2 border-border px-4 py-3 pr-14 lg:pr-4">
				<div className="grid gap-2 text-base">
					<h2 className="truncate text-base" title={heroTitle}>
						<span className="text-primary">
							{heroView.name} the {heroClass.name}
						</span>{" "}
						/ Level {heroView.level}
					</h2>

					<section className="grid gap-2" aria-label="Hero resources">
						<ResourceBar
							label="HP"
							value={`${health.currentHp}/${health.maxHp}`}
							tone="hp"
							fillPercent={(health.currentHp / health.maxHp) * 100}
							animateChanges={isCombat}
						/>
						<ResourceBar
							label="XP"
							value={xpResource.value}
							tone="xp"
							fillPercent={xpResource.fillPercent}
						/>
						<ActiveEffectsRow
							effects={combat?.player.activeEffects ?? []}
							label="Hero active effects"
						/>
					</section>
				</div>
			</header>

			<div className="flex min-h-0 flex-1 flex-col gap-3 px-4 py-3">
				<RunInfo
					battleNumber={state.battleNumber}
					day={state.day}
					gold={state.gold}
					zoneLabel={formatTitle(state.zone)}
				/>

				<Tabs
					aria-label="Hero sidebar"
					items={heroSidebarTabs}
					value={activeTab}
					onChange={setActiveTab}
					className="w-full shrink-0"
					panelClassName="flex min-h-0 flex-1 flex-col"
					renderPanel={(tab) => {
						if (tab === "combat") {
							return (
								<LogPanel title="Combat Log">
									<CombatLogPanel
										entries={combat?.log ?? []}
										className="flex-1"
									/>
								</LogPanel>
							);
						}
						if (tab === "world") {
							return <WorldLogPanel {...worldLog} />;
						}
						if (tab === "details") {
							return <HeroDetailsTab heroView={heroView} />;
						}

						if (tab === "equipment") {
							return (
								<HeroEquipmentTab
									equipment={heroView.equipment}
									canSwap={canSwapWeapons ?? false}
									isPending={isPending}
									onSwap={onSwapWeapons}
								/>
							);
						}

						return (
							<HeroSkillsTab
								skills={combat?.player.skills ?? heroView.skills}
								featIds={combat?.player.featIds ?? heroView.featIds}
							/>
						);
					}}
				/>
			</div>
		</Sidebar>
	);
}

type RunInfoProps = {
	gold: number;
	battleNumber: number;
	day: number;
	zoneLabel: string;
};

function RunInfo({ gold, battleNumber, day, zoneLabel }: RunInfoProps) {
	const runItems = [
		{ label: "Zone", value: zoneLabel },
		{ label: "Battle", value: battleNumber },
		{ label: "Gold", value: gold },
		{ label: "Day", value: day },
	];

	return (
		<section className="shrink-0" aria-label="Run">
			<dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-base">
				{runItems.map((item) => (
					<div key={item.label} className="grid grid-cols-[4rem_minmax(0,1fr)] gap-2">
						<dt className="text-text-label">{item.label}</dt>
						<dd className="min-w-0 truncate text-text-bright">{item.value}</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
