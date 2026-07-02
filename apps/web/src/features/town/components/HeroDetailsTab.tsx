import { attributes } from "@app/content";
import type { HeroView } from "@app/engine";
import clsx from "clsx";
import { Tooltip } from "../../../components/Tooltip";
import { StatTooltipContent } from "../../../components/tooltips/StatTooltipContent";
import { HeroSidebarSection, SidebarValueList } from "./HeroSidebarPrimitives";
import {
	armourTypeLabels,
	attributeLabels,
	attributeShortLabels,
	combatStatLabels,
	combatStatShortLabels,
	damageTypeLabels,
	weaponTypeLabels,
} from "../../../game/displayLabels";
import { formatStatNumber, HeroStatValue, type HeroDerivedValue } from "./HeroStatValue";

type DamageModifier = HeroView["combatStats"]["damageModifiers"][number]["modifier"];

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
	const resistanceValues = getActiveAffinityLabels(
		heroView.combatStats.damageAffinities.resistances,
	);
	const immunityValues = getActiveAffinityLabels(
		heroView.combatStats.damageAffinities.immunities,
	);
	const vulnerabilityValues = getActiveAffinityLabels(
		heroView.combatStats.damageAffinities.vulnerabilities,
	);
	const damageModifiers = heroView.combatStats.damageModifiers.map(({ modifier }) => modifier);
	const hasDamageDetails =
		resistanceValues.length > 0 ||
		immunityValues.length > 0 ||
		vulnerabilityValues.length > 0 ||
		damageModifiers.length > 0;

	return (
		<div className="grid gap-4">
			<HeroSidebarSection title="Attributes">
				<StatGrid items={attributeItems} />
			</HeroSidebarSection>

			<HeroSidebarSection title="Combat">
				<StatGrid items={combatItems} />
			</HeroSidebarSection>

			{hasDamageDetails && (
				<HeroSidebarSection title="Damage">
					<div className="grid gap-3">
						{resistanceValues.length > 0 && (
							<ValueGroup label="Resist" values={resistanceValues} />
						)}
						{immunityValues.length > 0 && (
							<ValueGroup label="Immune" values={immunityValues} />
						)}
						{vulnerabilityValues.length > 0 && (
							<ValueGroup label="Weak" values={vulnerabilityValues} />
						)}
						{damageModifiers.length > 0 && (
							<DamageModifierList modifiers={damageModifiers} />
						)}
					</div>
				</HeroSidebarSection>
			)}

			<HeroSidebarSection title="Proficiencies">
				<div className="grid gap-3">
					<ValueGroup
						label="Armour"
						values={heroView.proficiencies.armourTypes.map(
							(armourType) => armourTypeLabels[armourType],
						)}
					/>
					<ValueGroup
						label="Weapons"
						values={heroView.proficiencies.weaponTypes.map(
							(weaponType) => weaponTypeLabels[weaponType],
						)}
					/>
					<ValueGroup
						label="Saving Throws"
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
		<dl className="grid grid-cols-3 gap-x-4 gap-y-2">
			{items.map((item) => (
				<div key={item.label} className="flex items-baseline justify-between gap-2">
					<dt className="text-text-label">{item.label}</dt>
					<dd className="text-right">
						<Tooltip
							content={
								<StatTooltipContent
									label={item.fullLabel}
									stat={item.value}
									signed={item.signed}
								/>
							}
							placement="right"
							className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
							contentClassName="w-80 max-w-[calc(100vw-1rem)] sm:w-96"
						>
							<HeroStatValue stat={item.value} signed={item.signed} />
						</Tooltip>
					</dd>
				</div>
			))}
		</dl>
	);
}

type AffinityCollection = HeroView["combatStats"]["damageAffinities"]["resistances"];

function getActiveAffinityLabels(affinities: AffinityCollection) {
	return affinities
		.filter((affinity) => affinity.value)
		.map((affinity) => damageTypeLabels[affinity.damageType]);
}

function ValueGroup({ label, values }: { label: string; values: readonly string[] }) {
	return (
		<div className="grid gap-1">
			<p className="text-text-label">{label}</p>
			<SidebarValueList values={values} />
		</div>
	);
}

function DamageModifierList({ modifiers }: { modifiers: DamageModifier[] }) {
	return (
		<div className="grid gap-1">
			<p className="text-text-label">Modifiers</p>
			<ul className="grid gap-1">
				{modifiers.map((modifier, index) => (
					<li
						key={`${modifier.damageType ?? "all"}-${modifier.operation}-${modifier.value}-${index}`}
						className="flex items-center justify-between gap-3"
					>
						<span>
							{modifier.damageType ? damageTypeLabels[modifier.damageType] : "All"}
						</span>
						<span className={getDamageModifierClassName(modifier)}>
							{formatDamageModifierValue(modifier)}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}

function formatDamageModifierValue(modifier: DamageModifier) {
	if (modifier.operation === "multiply") {
		return `x${modifier.value}`;
	}

	return formatStatNumber(modifier.value, true);
}

function getDamageModifierClassName(modifier: DamageModifier) {
	if (modifier.operation === "multiply") {
		return clsx(
			modifier.value > 1 && "text-success",
			modifier.value < 1 && "text-error",
			modifier.value === 1 && "text-text-bright",
		);
	}

	return clsx(
		modifier.value > 0 && "text-success",
		modifier.value < 0 && "text-error",
		modifier.value === 0 && "text-text-bright",
	);
}
