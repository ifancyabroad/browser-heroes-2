import { CLASSES_BY_ID, type Zone } from "@app/content";
import { selectHeroProgression, selectHeroView } from "@app/engine";
import type { RunView } from "@app/shared";
import { useState } from "react";
import { Sidebar } from "../../../components/Sidebar";
import { ResourceBar } from "../../../components/ResourceBar";
import { getXpResource } from "../../../game/resourceDisplay";
import { formatTitle } from "../../../game/effectDisplay";
import { getTabId, Tabs } from "../../../components/Tabs";
import { HeroDetailsTab } from "./HeroDetailsTab";
import { HeroEquipmentTab } from "./HeroEquipmentTab";
import { HeroSkillsTab } from "./HeroSkillsTab";

type HeroSidebarProps = {
	run: RunView;
	battleNumber: number;
	day: number;
	gold: number;
	zone: Zone;
	open: boolean;
	onClose: () => void;
};

type HeroSidebarTab = "details" | "equipment" | "skills";

const heroSidebarTabs = [
	{ label: "Stats", value: "details" },
	{ label: "Equipment", value: "equipment" },
	{ label: "Skills", value: "skills" },
] as const;

export function HeroSidebar({
	run,
	battleNumber,
	day,
	gold,
	zone,
	open,
	onClose,
}: HeroSidebarProps) {
	const [activeTab, setActiveTab] = useState<HeroSidebarTab>("details");

	const { state } = run;
	const heroView = selectHeroView(state);
	const heroClass = CLASSES_BY_ID[heroView.classId];
	const progression = selectHeroProgression(state);
	const xpResource = getXpResource(progression);
	const { health } = heroView;
	const heroTitle = `${heroView.name} the ${heroClass.name} / Level ${heroView.level}`;

	return (
		<Sidebar
			open={open}
			onClose={onClose}
			aria-label="Hero details"
			title={
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
						/>
						<ResourceBar
							label="XP"
							value={xpResource.value}
							tone="xp"
							fillPercent={xpResource.fillPercent}
						/>
					</section>
				</div>
			}
			contentClassName="grid content-start gap-3"
		>
			<RunInfo
				battleNumber={battleNumber}
				day={day}
				gold={gold}
				zoneLabel={formatTitle(zone)}
			/>

			<Tabs
				aria-label="Hero sidebar"
				items={heroSidebarTabs}
				value={activeTab}
				onChange={setActiveTab}
				className="w-full"
				panelId="hero-sidebar-panel"
			/>

			<div
				id="hero-sidebar-panel"
				role="tabpanel"
				aria-labelledby={getTabId("hero-sidebar-panel", activeTab)}
				tabIndex={0}
			>
				{activeTab === "details" && <HeroDetailsTab heroView={heroView} />}
				{activeTab === "equipment" && <HeroEquipmentTab equipment={heroView.equipment} />}
				{activeTab === "skills" && (
					<HeroSkillsTab skills={heroView.skills} featIds={heroView.featIds} />
				)}
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
		<section aria-label="Run">
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
