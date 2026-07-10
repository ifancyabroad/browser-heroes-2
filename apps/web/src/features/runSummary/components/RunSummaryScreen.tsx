import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
	CLASSES_BY_ID,
	FEATS_BY_ID,
	ITEMS_BY_ID,
	SKILLS_BY_ID,
	type EquipmentSlot,
	type FeatId,
	type ItemId,
	type SkillId,
} from "@app/content";
import type { RunSummaryView as EngineRunSummaryView } from "@app/engine";
import { Card } from "../../../components/Card";
import { GameLayout } from "../../../components/GameLayout";
import { Tooltip } from "../../../components/Tooltip";
import { FeatTooltipContent } from "../../../components/tooltips/FeatTooltipContent";
import { ItemTooltipContent } from "../../../components/tooltips/ItemTooltipContent";
import { SkillTooltipContent } from "../../../components/tooltips/SkillTooltipContent";
import { equipmentSlotLabels } from "../../../game/displayLabels";
import { formatTitle } from "../../../game/effectDisplay";

type RunSummaryScreenProps = {
	summary: EngineRunSummaryView;
};

export function RunSummaryScreen({ summary }: RunSummaryScreenProps) {
	const heroClass = CLASSES_BY_ID[summary.hero.classId] ?? null;
	const heroClassName = heroClass?.name ?? summary.hero.classId;
	const zoneLabel = formatTitle(summary.zone);
	const outcomeLabel = summary.outcome === "dead" ? "Defeat" : "Retired";
	const outcomeClassName = summary.outcome === "dead" ? "text-error" : "text-success";
	const equipment = getEquipmentSummary(summary.hero.equipment);

	return (
		<GameLayout>
			<div className="min-h-0 flex-1 overflow-y-auto bg-bg-base px-4 py-6 text-base text-text">
				<Card className="mx-auto grid w-full max-w-xl gap-5 p-4">
					<header className="flex items-start justify-between gap-4">
						<div className="grid gap-2">
							<p className={clsx("uppercase tracking-widest", outcomeClassName)}>
								{outcomeLabel}
							</p>
							<h1 className="text-base text-text-bright">
								{summary.hero.name} the {heroClassName} / Level {summary.hero.level}
							</h1>
						</div>
						<Link className="shrink-0 text-primary underline hover:opacity-80" to="/">
							Home
						</Link>
					</header>

					<StatRows
						items={[
							{ label: "Battle", value: summary.battleNumber },
							{ label: "Zone", value: zoneLabel },
							{ label: "Gold", value: summary.gold },
							{ label: "XP", value: summary.xp },
							...(summary.outcome === "dead"
								? [
										{
											label: "Slain By",
											value: summary.finalEnemy?.name ?? "Unknown",
											valueClassName: "text-error",
										},
									]
								: []),
						]}
					/>

					<IconShelf
						title="Equipment"
						items={equipment}
						emptyLabel="No equipment recorded."
						renderItem={(entry) => (
							<EquipmentSummaryItem
								key={`${entry.slot}-${entry.itemId}`}
								slot={entry.slot}
								itemId={entry.itemId}
							/>
						)}
					/>

					<IconShelf
						title="Skills"
						items={summary.hero.skills}
						emptyLabel="No skills recorded."
						renderItem={(skill) => (
							<SkillSummaryItem key={skill.skillId} skillId={skill.skillId} />
						)}
					/>

					<IconShelf
						title="Feats"
						items={summary.hero.featIds}
						emptyLabel="No feats recorded."
						renderItem={(featId) => <FeatSummaryItem key={featId} featId={featId} />}
					/>
				</Card>
			</div>
		</GameLayout>
	);
}

type EquipmentSummaryEntry = {
	slot: EquipmentSlot;
	itemId: ItemId;
};

function getEquipmentSummary(
	equipment: EngineRunSummaryView["hero"]["equipment"],
): EquipmentSummaryEntry[] {
	return Object.entries(equipment).flatMap(([slot, equippedItem]) => {
		if (!equippedItem) {
			return [];
		}

		return [{ slot: slot as EquipmentSlot, itemId: equippedItem.itemId }];
	});
}

type StatRowsProps = {
	items: readonly {
		label: string;
		value: string | number;
		valueClassName?: string;
	}[];
};

function StatRows({ items }: StatRowsProps) {
	return (
		<dl className="grid content-start gap-1">
			{items.map((item) => (
				<div
					key={item.label}
					className="grid grid-cols-[6rem_minmax(0,1fr)] items-baseline gap-3"
				>
					<dt className="text-text-label">{item.label}</dt>
					<dd
						className={clsx(
							"min-w-0 break-words text-text-bright",
							item.valueClassName,
						)}
					>
						{item.value}
					</dd>
				</div>
			))}
		</dl>
	);
}

function SectionTitle({ children }: { children: ReactNode }) {
	return <h2 className="text-base text-text-bright">{children}</h2>;
}

function EmptyState({ children }: { children: ReactNode }) {
	return <p className="text-text-muted">{children}</p>;
}

type EquipmentSummaryItemProps = {
	slot: EquipmentSlot;
	itemId: ItemId;
};

function EquipmentSummaryItem({ slot, itemId }: EquipmentSummaryItemProps) {
	const item = ITEMS_BY_ID[itemId] ?? null;
	const content = (
		<span
			className="grid h-14 w-14 place-items-center overflow-hidden"
			title={`${equipmentSlotLabels[slot]}: ${item?.name ?? itemId}`}
		>
			<span className="sr-only">
				{equipmentSlotLabels[slot]}: {item?.name ?? itemId}
			</span>
			{item && (
				<img src={item.icon} alt="" loading="lazy" className="h-12 w-12 object-cover" />
			)}
		</span>
	);

	if (!item) {
		return <li>{content}</li>;
	}

	return (
		<li>
			<Tooltip
				content={<ItemTooltipContent item={item} slot={slot} />}
				contentClassName="w-96 max-w-[calc(100vw-1rem)]"
			>
				{content}
			</Tooltip>
		</li>
	);
}

type IconShelfProps<T> = {
	title: string;
	items: readonly T[];
	emptyLabel: string;
	renderItem: (item: T) => ReactNode;
};

function IconShelf<T>({ title, items, emptyLabel, renderItem }: IconShelfProps<T>) {
	return (
		<section className="grid content-start gap-2">
			<SectionTitle>{title}</SectionTitle>
			{items.length > 0 ? (
				<ul className="flex flex-wrap gap-2">{items.map(renderItem)}</ul>
			) : (
				<EmptyState>{emptyLabel}</EmptyState>
			)}
		</section>
	);
}

function SkillSummaryItem({ skillId }: { skillId: SkillId }) {
	const skill = SKILLS_BY_ID[skillId] ?? null;

	if (!skill) {
		return null;
	}

	return (
		<li>
			<Tooltip
				content={<SkillTooltipContent skill={{ skillId: skill.id }} definition={skill} />}
				contentClassName="w-96 max-w-[calc(100vw-1rem)]"
			>
				<span className="grid h-14 w-14 place-items-center overflow-hidden">
					<img
						src={skill.icon}
						alt={skill.name}
						loading="lazy"
						className="h-12 w-12 object-cover"
					/>
				</span>
			</Tooltip>
		</li>
	);
}

function FeatSummaryItem({ featId }: { featId: FeatId }) {
	const feat = FEATS_BY_ID[featId] ?? null;

	if (!feat) {
		return null;
	}

	return (
		<li>
			<Tooltip
				content={<FeatTooltipContent feat={feat} />}
				contentClassName="w-96 max-w-[calc(100vw-1rem)]"
			>
				<span className="grid h-14 w-14 place-items-center overflow-hidden">
					<img
						src={feat.icon}
						alt={feat.name}
						loading="lazy"
						className="h-12 w-12 object-cover"
					/>
				</span>
			</Tooltip>
		</li>
	);
}
