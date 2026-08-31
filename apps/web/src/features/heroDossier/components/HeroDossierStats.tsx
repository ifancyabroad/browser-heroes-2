import { attributes } from "@app/content";
import type { HeroView } from "@app/engine";
import { Badge } from "../../../components/Badge";
import { HeroStatValue } from "../../../components/HeroStatValue";
import { Tooltip } from "../../../components/Tooltip";
import {
	DamageAffinityTooltipContent,
	DamageModifierTooltipContent,
} from "../../../components/tooltips/DamageTooltipContent";
import { StatTooltipContent } from "../../../components/tooltips/StatTooltipContent";
import { formatDamageSelector, getDamageTypeBorderClass } from "../../../presentation/damage";
import { formatModifierValue } from "../../../presentation/effects";
import { attributeLabels, combatStatLabels, damageTypeLabels } from "../../../presentation/labels";
import {
	getArmourClassStatPresentation,
	getStatPresentation,
	type StatPresentation,
} from "../../../presentation/stats";

const statRowClassName =
	"!grid w-full cursor-help grid-cols-[1fr_auto] items-baseline gap-4 px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function AttributesSection({ hero }: { hero: HeroView }) {
	return (
		<section className="grid gap-3" aria-label="Attributes">
			<h2 className="text-text-bright">Attributes</h2>
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
	displayLabel: string;
	stat: StatPresentation;
	signed?: boolean;
};

export function CombatSection({ hero }: { hero: HeroView }) {
	const optionalStats: CombatStatItem[] = [
		{
			label: combatStatLabels.attackRollBonus,
			displayLabel: "Attack",
			stat: getStatPresentation(hero.combatStats.attackRollBonus),
			signed: true,
		},
		{
			label: combatStatLabels.savingThrowBonus,
			displayLabel: "Save",
			stat: getStatPresentation(hero.combatStats.savingThrowBonus),
			signed: true,
		},
		{
			label: combatStatLabels.saveDcBonus,
			displayLabel: "Save DC",
			stat: getStatPresentation(hero.combatStats.saveDcBonus),
			signed: true,
		},
		{
			label: combatStatLabels.criticalRangeBonus,
			displayLabel: "Crit Range",
			stat: getStatPresentation(hero.combatStats.criticalRangeBonus),
		},
		{
			label: combatStatLabels.criticalDiceMultiplierBonus,
			displayLabel: "Crit Dice",
			stat: getStatPresentation(hero.combatStats.criticalDiceMultiplierBonus),
		},
		{
			label: combatStatLabels.healingMultiplier,
			displayLabel: "Healing",
			stat: getStatPresentation(hero.combatStats.healingMultiplier),
		},
	];
	const stats = optionalStats.filter((item) => item.stat.contributions.length > 0);

	return (
		<section className="grid gap-3" aria-label="Combat">
			<h2 className="text-text-bright">Combat</h2>
			<ul className="grid gap-y-2">
				<li className="grid grid-cols-[1fr_auto] items-baseline gap-4 px-1">
					<span className="text-text-label">Max HP</span>
					<span className="text-right text-text-bright tabular-nums">
						{hero.health.maxHp}
					</span>
				</li>
				<StatRow
					label={combatStatLabels.armourClass}
					displayLabel="Armour"
					stat={getArmourClassStatPresentation(hero.armourClassBreakdown)}
				/>
				{stats.map((item) => (
					<StatRow key={item.label} {...item} />
				))}
			</ul>
		</section>
	);
}

type AffinityCollection = HeroView["combatStats"]["damageAffinities"]["resistances"];
type DamageAffinity = AffinityCollection[number];
type DamageModifier = HeroView["combatStats"]["damageModifiers"][number];

export function DamageSection({ hero }: { hero: HeroView }) {
	const resistances = getActiveAffinities(hero.combatStats.damageAffinities.resistances);
	const immunities = getActiveAffinities(hero.combatStats.damageAffinities.immunities);
	const vulnerabilities = getActiveAffinities(hero.combatStats.damageAffinities.vulnerabilities);
	const damageModifiers = hero.combatStats.damageModifiers;
	const hasDamageDetails =
		resistances.length > 0 ||
		immunities.length > 0 ||
		vulnerabilities.length > 0 ||
		damageModifiers.length > 0;

	if (!hasDamageDetails) {
		return null;
	}

	return (
		<section className="grid gap-3" aria-label="Damage">
			<div className="grid gap-3">
				<DamageAffinityGroup
					title="Resistances"
					affinityLabel="Resistance"
					affinities={resistances}
				/>
				<DamageAffinityGroup
					title="Immunities"
					affinityLabel="Immunity"
					affinities={immunities}
				/>
				<DamageAffinityGroup
					title="Vulnerabilities"
					affinityLabel="Vulnerability"
					affinities={vulnerabilities}
				/>
				{damageModifiers.length > 0 && <DamageBonusGroup modifiers={damageModifiers} />}
			</div>
		</section>
	);
}

function getActiveAffinities(affinities: AffinityCollection) {
	return affinities.filter((affinity) => affinity.value);
}

function DamageAffinityGroup({
	title,
	affinityLabel,
	affinities,
}: {
	title: string;
	affinityLabel: string;
	affinities: readonly DamageAffinity[];
}) {
	if (affinities.length === 0) {
		return null;
	}

	return (
		<div className="grid gap-1.5">
			<h2 className="text-text-bright">{title}</h2>
			<ul className="flex flex-wrap gap-1">
				{affinities.map((affinity) => (
					<li key={affinity.damageType} className="flex">
						<Tooltip
							content={
								<DamageAffinityTooltipContent
									affinity={affinity}
									affinityLabel={affinityLabel}
								/>
							}
							contentClassName="w-64 max-w-[calc(100vw-1rem)]"
							className="!flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						>
							<Badge
								label={damageTypeLabels[affinity.damageType]}
								variant="muted"
								textTone="bright"
								className={getDamageTypeBorderClass(affinity.damageType)}
							/>
						</Tooltip>
					</li>
				))}
			</ul>
		</div>
	);
}

function DamageBonusGroup({ modifiers }: { modifiers: readonly DamageModifier[] }) {
	return (
		<div className="grid gap-1.5">
			<h2 className="text-text-bright">Damage</h2>
			<ul className="flex flex-wrap gap-1">
				{modifiers.map((modifier) => {
					const damageLabel = formatDamageSelector(modifier);
					return (
						<li key={`${damageLabel}-${modifier.operation}`} className="flex">
							<Tooltip
								content={
									<DamageModifierTooltipContent
										modifierGroup={modifier}
										kind="damageBonus"
									/>
								}
								contentClassName="w-64 max-w-[calc(100vw-1rem)]"
								className="!flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
							>
								<Badge
									label={`${formatModifierValue(modifier.operation, modifier.value)} ${damageLabel}`}
									variant="muted"
									textTone="bright"
									className={
										modifier.damageType
											? getDamageTypeBorderClass(modifier.damageType)
											: undefined
									}
								/>
							</Tooltip>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

function StatRow({
	label,
	displayLabel,
	stat,
	signed = false,
}: {
	label: string;
	displayLabel?: string;
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
				<span className="text-text-label">{displayLabel ?? label}</span>
				<span className="text-right tabular-nums">
					<HeroStatValue stat={stat} signed={signed} />
				</span>
			</Tooltip>
		</li>
	);
}
