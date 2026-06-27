import { attributes, CLASSES_BY_ID } from "@app/content";
import { selectHeroProgression, type HeroProgressionView } from "@app/engine";
import type { RunView } from "@app/shared";
import { Sidebar } from "../../../components/Sidebar";
import { ResourceBar } from "../../../components/ResourceBar";
import { StatList, type StatListItem } from "./StatList";

type HeroSidebarProps = {
	run: RunView;
	open: boolean;
	onClose: () => void;
};

function formatLabel(value: string) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

export function HeroSidebar({ run, open, onClose }: HeroSidebarProps) {
	const { state } = run;
	const { hero } = state;
	const heroClass = CLASSES_BY_ID[hero.classId];
	const progression = selectHeroProgression(state);
	const xpResource = getXpResource(progression);

	const attributeItems: StatListItem[] = attributes.map((attribute) => ({
		label: formatLabel(attribute),
		value: hero.attributes[attribute],
	}));

	const runItems: StatListItem[] = [
		{ label: "Gold", value: state.gold },
		{ label: "Battle", value: state.battleNumber },
		{ label: "Zone", value: state.zoneNumber },
		{ label: "Streak", value: state.streak },
	];

	return (
		<Sidebar
			open={open}
			onClose={onClose}
			aria-label="Hero details"
			title={
				<div
					className="grid gap-1 text-base"
					title={`${hero.name} the ${heroClass.name} - Level ${hero.level}`}
				>
					<p className="truncate text-primary">
						{hero.name} the {heroClass.name}
					</p>
					<p className="text-text">Level {hero.level}</p>
				</div>
			}
			contentClassName="grid gap-4"
		>
			<section className="grid gap-2" aria-label="Hero resources">
				<ResourceBar
					label="HP"
					value={`${hero.currentHp}/${hero.maxHp}`}
					tone="hp"
					fillPercent={(hero.currentHp / hero.maxHp) * 100}
				/>
				<ResourceBar
					label="XP"
					value={xpResource.value}
					tone="xp"
					fillPercent={xpResource.fillPercent}
				/>
			</section>

			<section className="grid gap-2" aria-labelledby="attributes-heading">
				<h2 id="attributes-heading" className="text-base text-text-bright">
					Attributes
				</h2>
				<StatList items={attributeItems} />
			</section>

			<section className="grid gap-2" aria-labelledby="run-heading">
				<h2 id="run-heading" className="text-base text-text-bright">
					Run
				</h2>
				<StatList items={runItems} />
			</section>
		</Sidebar>
	);
}

function getXpResource(progression: HeroProgressionView) {
	if (progression.nextLevelXp === null) {
		return {
			value: "Max",
			fillPercent: 100,
		};
	}

	const progressXp = Math.max(0, progression.xp - progression.currentLevelXp);
	const neededXp = Math.max(1, progression.nextLevelXp - progression.currentLevelXp);

	return {
		value: `${progressXp}/${neededXp}`,
		fillPercent: (progressXp / neededXp) * 100,
	};
}
