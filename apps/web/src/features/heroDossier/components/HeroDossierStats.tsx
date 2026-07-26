import { attributes } from "@app/content";
import type { HeroView } from "@app/engine";
import { HeroStatValue } from "../../../components/HeroStatValue";
import { SectionHeading } from "../../../components/SectionHeading";
import { Tooltip } from "../../../components/Tooltip";
import { StatTooltipContent } from "../../../components/tooltips/StatTooltipContent";
import { attributeLabels, combatStatLabels } from "../../../game/displayLabels";
import {
	getArmourClassStatPresentation,
	getStatPresentation,
	type StatPresentation,
} from "../../../game/statDisplay";

const statRowClassName =
	"!grid w-full cursor-help grid-cols-[1fr_auto] items-baseline gap-4 px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function AttributesSection({ hero }: { hero: HeroView }) {
	return (
		<section className="grid gap-3" aria-label="Attributes">
			<SectionHeading title="Attributes" />
			<ul className="grid gap-y-2">
				{attributes.map((attribute) => {
					const stat = getStatPresentation(hero.attributes[attribute]);
					const label = attributeLabels[attribute];

					return <StatRow key={attribute} label={label} stat={stat} />;
				})}
			</ul>
		</section>
	);
}

type CombatStatItem = {
	label: string;
	stat: StatPresentation;
	signed?: boolean;
};

export function CombatSection({ hero }: { hero: HeroView }) {
	const stats: CombatStatItem[] = [
		{
			label: combatStatLabels.armourClass,
			stat: getArmourClassStatPresentation(hero.armourClassBreakdown),
		},
		{
			label: combatStatLabels.attackRollBonus,
			stat: getStatPresentation(hero.combatStats.attackRollBonus),
			signed: true,
		},
		{
			label: combatStatLabels.savingThrowBonus,
			stat: getStatPresentation(hero.combatStats.savingThrowBonus),
			signed: true,
		},
		{
			label: combatStatLabels.saveDcBonus,
			stat: getStatPresentation(hero.combatStats.saveDcBonus),
			signed: true,
		},
	];

	return (
		<section className="grid gap-3" aria-label="Combat">
			<SectionHeading title="Combat" />
			<ul className="grid gap-y-2">
				<li className="grid grid-cols-[1fr_auto] items-baseline gap-4 px-1">
					<span className="text-text-label">Maximum Health</span>
					<span className="text-right text-text-bright tabular-nums">
						{hero.health.maxHp}
					</span>
				</li>
				{stats.map((item) => (
					<StatRow key={item.label} {...item} />
				))}
			</ul>
		</section>
	);
}

function StatRow({
	label,
	stat,
	signed = false,
}: {
	label: string;
	stat: StatPresentation;
	signed?: boolean;
}) {
	return (
		<li>
			<Tooltip
				content={<StatTooltipContent label={label} stat={stat} />}
				placement="top"
				className={statRowClassName}
				contentClassName="w-64 max-w-[calc(100vw-1rem)]"
			>
				<span className="text-text-label">{label}</span>
				<span className="text-right tabular-nums">
					<HeroStatValue stat={stat} signed={signed} />
				</span>
			</Tooltip>
		</li>
	);
}
