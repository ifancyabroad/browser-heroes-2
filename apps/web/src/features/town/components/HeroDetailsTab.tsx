import { attributes } from "@app/content";
import type { HeroView } from "@app/engine";
import { Badge } from "../../../components/Badge";
import { Tooltip } from "../../../components/Tooltip";
import {
	DamageAffinityTooltipContent,
	DamageModifierTooltipContent,
} from "../../../components/tooltips/DamageTooltipContent";
import { StatTooltipContent } from "../../../components/tooltips/StatTooltipContent";
import { EmptySidebarText, HeroSidebarSection } from "./HeroSidebarPrimitives";
import {
	armourTypeLabels,
	attributeLabels,
	attributeShortLabels,
	combatStatLabels,
	combatStatShortLabels,
	damageTypeLabels,
	weaponTypeLabels,
} from "../../../game/displayLabels";
import { formatModifierValue } from "../../../game/effectDisplay";
import { HeroStatValue, type HeroDerivedValue } from "./HeroStatValue";

type StatGridItem = {
	label: string;
	fullLabel: string;
	value: HeroDerivedValue;
	signed?: boolean;
};

export function HeroDetailsTab({ heroView }: { heroView: HeroView }) {
	const attributeItems: StatGridItem[] = attributes.map((attribute) => ({
		label: attributeShortLabels[attribute],
		fullLabel: attributeLabels[attribute],
		value: heroView.attributes[attribute],
	}));

	const combatItems: StatGridItem[] = [
		{
			label: combatStatShortLabels.armourClass,
			fullLabel: combatStatLabels.armourClass,
			value: heroView.combatStats.armourClass,
		},
		{
			label: combatStatShortLabels.proficiencyBonus,
			fullLabel: combatStatLabels.proficiencyBonus,
			value: heroView.combatStats.proficiencyBonus,
			signed: true,
		},
		{
			label: combatStatShortLabels.attackRollBonus,
			fullLabel: combatStatLabels.attackRollBonus,
			value: heroView.combatStats.attackRollBonus,
			signed: true,
		},
		{
			label: combatStatShortLabels.savingThrowBonus,
			fullLabel: combatStatLabels.savingThrowBonus,
			value: heroView.combatStats.savingThrowBonus,
			signed: true,
		},
		{
			label: combatStatShortLabels.saveDcBonus,
			fullLabel: combatStatLabels.saveDcBonus,
			value: heroView.combatStats.saveDcBonus,
			signed: true,
		},
		{
			label: combatStatShortLabels.critChance,
			fullLabel: combatStatLabels.critChance,
			value: heroView.combatStats.critChance,
		},
		{
			label: combatStatShortLabels.critMultiplier,
			fullLabel: combatStatLabels.critMultiplier,
			value: heroView.combatStats.critMultiplier,
		},
		{
			label: combatStatShortLabels.damageReduction,
			fullLabel: combatStatLabels.damageReduction,
			value: heroView.combatStats.damageReduction,
		},
		{
			label: combatStatShortLabels.healingMultiplier,
			fullLabel: combatStatLabels.healingMultiplier,
			value: heroView.combatStats.healingMultiplier,
		},
	];
	const resistances = getActiveAffinities(heroView.combatStats.damageAffinities.resistances);
	const immunities = getActiveAffinities(heroView.combatStats.damageAffinities.immunities);
	const vulnerabilities = getActiveAffinities(
		heroView.combatStats.damageAffinities.vulnerabilities,
	);
	const damageModifiers = heroView.combatStats.damageModifiers;
	const hasDamageDetails =
		resistances.length > 0 ||
		immunities.length > 0 ||
		vulnerabilities.length > 0 ||
		damageModifiers.length > 0;

	return (
		<div className="grid gap-3">
			<HeroSidebarSection title="Attributes">
				<StatGrid items={attributeItems} />
			</HeroSidebarSection>

			<HeroSidebarSection title="Combat">
				<StatGrid items={combatItems} />
			</HeroSidebarSection>

			{hasDamageDetails && (
				<HeroSidebarSection title="Damage">
					<div className="grid gap-2">
						{resistances.length > 0 && (
							<DamageAffinityGroup
								label="Resist"
								affinityLabel="Resistance"
								affinities={resistances}
							/>
						)}
						{immunities.length > 0 && (
							<DamageAffinityGroup
								label="Immune"
								affinityLabel="Immunity"
								affinities={immunities}
							/>
						)}
						{vulnerabilities.length > 0 && (
							<DamageAffinityGroup
								label="Weak"
								affinityLabel="Vulnerability"
								affinities={vulnerabilities}
							/>
						)}
						{damageModifiers.length > 0 && (
							<DamageModifierList modifiers={damageModifiers} />
						)}
					</div>
				</HeroSidebarSection>
			)}

			<HeroSidebarSection title="Proficiencies">
				<div className="grid gap-2">
					<ProficiencyGroup
						label="Armour"
						values={heroView.proficiencies.armourTypes.map(
							(armourType) => armourTypeLabels[armourType],
						)}
					/>
					<ProficiencyGroup
						label="Weapons"
						values={heroView.proficiencies.weaponTypes.map(
							(weaponType) => weaponTypeLabels[weaponType],
						)}
					/>
					<ProficiencyGroup
						label="Saves"
						values={heroView.proficiencies.savingThrows.map(
							(attribute) => attributeShortLabels[attribute],
						)}
					/>
				</div>
			</HeroSidebarSection>
		</div>
	);
}

function StatGrid({ items }: { items: readonly StatGridItem[] }) {
	return (
		<ul className="grid grid-cols-3 gap-x-4 gap-y-2">
			{items.map((item) => (
				<li key={item.label}>
					<Tooltip
						content={
							<StatTooltipContent
								label={item.fullLabel}
								stat={item.value}
								signed={item.signed}
							/>
						}
						placement="top"
						className="w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						contentClassName="w-56 max-w-[calc(100vw-1rem)]"
					>
						<span className="flex items-baseline justify-between gap-2">
							<span className="text-text-label">{item.label}</span>
							<span className="text-right">
								<HeroStatValue stat={item.value} signed={item.signed} />
							</span>
						</span>
					</Tooltip>
				</li>
			))}
		</ul>
	);
}

type AffinityCollection = HeroView["combatStats"]["damageAffinities"]["resistances"];
type DamageAffinity = AffinityCollection[number];
type DamageModifierGroup = HeroView["combatStats"]["damageModifiers"][number];

function getActiveAffinities(affinities: AffinityCollection) {
	return affinities.filter((affinity) => affinity.value);
}

type DamageAffinityGroupProps = {
	label: string;
	affinityLabel: string;
	affinities: readonly DamageAffinity[];
};

function DamageAffinityGroup({ label, affinityLabel, affinities }: DamageAffinityGroupProps) {
	return (
		<div className="grid grid-cols-[5rem_minmax(0,1fr)] items-start gap-3">
			<p className="py-0.5 text-text-label">{label}</p>
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
							className="!flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						>
							<Badge
								label={damageTypeLabels[affinity.damageType]}
								variant="muted"
								textTone="bright"
							/>
						</Tooltip>
					</li>
				))}
			</ul>
		</div>
	);
}

function ProficiencyGroup({ label, values }: { label: string; values: readonly string[] }) {
	return (
		<div className="grid grid-cols-[5rem_minmax(0,1fr)] items-start gap-3">
			<p className="py-0.5 text-text-label">{label}</p>
			{values.length > 0 ? (
				<ul className="flex flex-wrap gap-1">
					{values.map((value) => (
						<li key={value} className="flex">
							<Badge label={value} variant="muted" textTone="bright" />
						</li>
					))}
				</ul>
			) : (
				<EmptySidebarText>None</EmptySidebarText>
			)}
		</div>
	);
}

function DamageModifierList({ modifiers }: { modifiers: readonly DamageModifierGroup[] }) {
	return (
		<div className="grid grid-cols-[5rem_minmax(0,1fr)] items-start gap-3">
			<p className="py-0.5 text-text-label">Bonus</p>
			<ul className="flex flex-wrap gap-1">
				{modifiers.map((modifierGroup) => {
					const damageTypeLabel = modifierGroup.damageType
						? damageTypeLabels[modifierGroup.damageType]
						: "All";
					const badgeLabel = `${formatModifierValue(
						modifierGroup.operation,
						modifierGroup.value,
					)} ${damageTypeLabel}`;

					return (
						<li
							key={`${modifierGroup.damageType ?? "all"}-${modifierGroup.operation}`}
							className="flex"
						>
							<Tooltip
								content={
									<DamageModifierTooltipContent modifierGroup={modifierGroup} />
								}
								contentClassName="w-64 max-w-[calc(100vw-1rem)]"
								className="!flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
							>
								<Badge label={badgeLabel} variant="muted" textTone="bright" />
							</Tooltip>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
