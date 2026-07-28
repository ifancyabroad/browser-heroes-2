import { equipmentSlots, FEATS_BY_ID, SKILLS_BY_ID } from "@app/content";
import { selectItemDefinition, type HeroView } from "@app/engine";
import clsx from "clsx";
import { Badge } from "../../../components/Badge";
import { SectionHeading } from "../../../components/SectionHeading";
import { Tooltip } from "../../../components/Tooltip";
import { FeatTooltipContent } from "../../../components/tooltips/FeatTooltipContent";
import { ItemTooltipContent } from "../../../components/tooltips/ItemTooltipContent";
import { SkillTooltipContent } from "../../../components/tooltips/SkillTooltipContent";
import {
	equipmentSlotLabels,
	featCategoryLabels,
	skillCategoryLabels,
} from "../../../presentation/labels";
import { getItemRarityTextClassName } from "../../../presentation/items";
import { resolveImageUrl } from "../../../utils/image";

export function EquipmentSection({ hero }: { hero: HeroView }) {
	const equippedItems = equipmentSlots.flatMap((slot) => {
		const equipped = hero.equipment[slot];

		if (!equipped) {
			return [];
		}

		const item = selectItemDefinition(equipped);

		return item ? [{ slot, item }] : [];
	});

	return (
		<section className="grid gap-3 bg-bg-panel px-4 py-4" aria-label="Equipment">
			<SectionHeading title="Equipment" />
			{equippedItems.length > 0 ? (
				<ul className="grid gap-1">
					{equippedItems.map(({ slot, item }) => (
						<li key={slot}>
							<Tooltip
								content={<ItemTooltipContent item={item} slot={slot} />}
								placement="top"
								className="!block w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
								contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
							>
								<DossierEntryCard
									icon={item.icon}
									name={item.name}
									subtitle={equipmentSlotLabels[slot]}
									nameClassName={getItemRarityTextClassName(item.rarity)}
								/>
							</Tooltip>
						</li>
					))}
				</ul>
			) : (
				<EmptyText>No equipment worn.</EmptyText>
			)}
		</section>
	);
}

export function AbilitiesSection({ hero }: { hero: HeroView }) {
	return (
		<div className="grid items-start gap-5 bg-bg-panel px-4 py-4">
			<SkillsSection hero={hero} />
			<FeatsSection hero={hero} />
		</div>
	);
}

function SkillsSection({ hero }: { hero: HeroView }) {
	return (
		<section className="grid gap-3" aria-label="Skills">
			<SectionHeading title="Skills" />
			{hero.skills.length > 0 ? (
				<ul className="grid gap-1">
					{hero.skills.map((skill) => {
						const definition = SKILLS_BY_ID[skill.skillId];
						const charges =
							definition.maxUses === undefined
								? null
								: `${skill.chargesRemaining ?? definition.maxUses}/${definition.maxUses}`;

						return (
							<li key={skill.skillId}>
								<Tooltip
									content={
										<SkillTooltipContent
											skill={skill}
											definition={definition}
										/>
									}
									placement="top"
									className="!block w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
									contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
								>
									<DossierEntryCard
										icon={definition.icon}
										name={definition.name}
										subtitle={skillCategoryLabels[definition.category]}
										badge={charges}
									/>
								</Tooltip>
							</li>
						);
					})}
				</ul>
			) : (
				<EmptyText>No skills learned.</EmptyText>
			)}
		</section>
	);
}

function FeatsSection({ hero }: { hero: HeroView }) {
	return (
		<section className="grid gap-3" aria-label="Feats">
			<SectionHeading title="Feats" />
			{hero.featIds.length > 0 ? (
				<ul className="grid gap-1">
					{hero.featIds.map((featId) => {
						const feat = FEATS_BY_ID[featId];

						return (
							<li key={featId}>
								<Tooltip
									content={<FeatTooltipContent feat={feat} />}
									placement="top"
									className="!block w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
									contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
								>
									<DossierEntryCard
										icon={feat.icon}
										name={feat.name}
										subtitle={featCategoryLabels[feat.category]}
									/>
								</Tooltip>
							</li>
						);
					})}
				</ul>
			) : (
				<EmptyText>No feats learned.</EmptyText>
			)}
		</section>
	);
}

function DossierEntryCard({
	icon,
	name,
	subtitle,
	badge,
	nameClassName,
}: {
	icon: string;
	name: string;
	subtitle: string;
	badge?: string | null;
	nameClassName?: string;
}) {
	return (
		<span className="grid min-h-15 grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-3 px-1 py-1 text-left hover:bg-bg-elevated">
			<img
				src={resolveImageUrl(icon)}
				alt=""
				loading="lazy"
				aria-hidden
				className="h-12 w-12 object-cover"
			/>
			<span className="grid min-w-0 gap-1">
				<span className={clsx("break-words", nameClassName ?? "text-text-bright")}>
					{name}
				</span>
				<span className="text-text-muted">{subtitle}</span>
			</span>
			{badge && <Badge label={badge} className="text-primary" />}
		</span>
	);
}

function EmptyText({ children }: { children: string }) {
	return <p className="py-2 text-text-muted">{children}</p>;
}
