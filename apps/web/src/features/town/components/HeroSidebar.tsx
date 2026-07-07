import { CLASSES_BY_ID } from "@app/content";
import { selectHeroProgression, selectHeroView } from "@app/engine";
import type { RunView } from "@app/shared";
import { useState } from "react";
import { Sidebar } from "../../../components/Sidebar";
import { ResourceBar } from "../../../components/ResourceBar";
import { getXpResource } from "../../../game/resourceDisplay";
import { Tabs } from "../../../components/Tabs";
import { HeroDetailsTab } from "./HeroDetailsTab";
import { HeroEquipmentTab } from "./HeroEquipmentTab";
import { HeroSkillsTab } from "./HeroSkillsTab";

type HeroSidebarProps = {
	run: RunView;
	open: boolean;
	onClose: () => void;
};

type HeroSidebarTab = "details" | "equipment" | "skills";

const heroSidebarTabs = [
	{ label: "Details", value: "details" },
	{ label: "Equipment", value: "equipment" },
	{ label: "Skills", value: "skills" },
] as const;

export function HeroSidebar({ run, open, onClose }: HeroSidebarProps) {
	const [activeTab, setActiveTab] = useState<HeroSidebarTab>("details");

	const { state } = run;
	const heroView = selectHeroView(state);
	const heroClass = CLASSES_BY_ID[heroView.classId];
	const progression = selectHeroProgression(state);
	const xpResource = getXpResource(progression);
	const { health } = heroView;

	return (
		<Sidebar
			open={open}
			onClose={onClose}
			aria-label="Hero details"
			title={
				<div className="grid gap-2 text-base">
					<h2
						className="truncate text-base"
						title={`Level ${heroView.level} ${heroClass.name} ${heroView.name}`}
					>
						Level {heroView.level}{" "}
						<span className="text-primary">
							{heroClass.name} {heroView.name}
						</span>
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
			contentClassName="grid content-start gap-4 pt-2"
		>
			<RunInfo
				gold={state.gold}
				battleNumber={state.battleNumber}
				zoneNumber={state.zoneNumber}
			/>

			<Tabs
				aria-label="Hero sidebar"
				items={heroSidebarTabs}
				value={activeTab}
				onChange={setActiveTab}
				className="gap-x-3"
			/>

			{activeTab === "details" && <HeroDetailsTab heroView={heroView} />}
			{activeTab === "equipment" && <HeroEquipmentTab equipment={heroView.equipment} />}
			{activeTab === "skills" && (
				<HeroSkillsTab skills={heroView.skills} featIds={heroView.featIds} />
			)}
		</Sidebar>
	);
}

type RunInfoProps = {
	gold: number;
	battleNumber: number;
	zoneNumber: number;
};

function RunInfo({ gold, battleNumber, zoneNumber }: RunInfoProps) {
	const runItems = [
		{ label: "Gold", value: gold },
		{ label: "Battle", value: battleNumber },
		{ label: "Zone", value: zoneNumber },
	];

	return (
		<section aria-label="Run">
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
