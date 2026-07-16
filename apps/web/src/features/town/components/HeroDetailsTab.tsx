import { attributes } from "@app/content";
import type { HeroView } from "@app/engine";
import { Badge } from "../../../components/Badge";
import { Tooltip } from "../../../components/Tooltip";
import { StatTooltipContent } from "../../../components/tooltips/StatTooltipContent";
import { EmptySidebarText, HeroSidebarSection, SidebarValueList } from "./HeroSidebarPrimitives";
import {
	armourTypeLabels,
	attributeLabels,
	attributeShortLabels,
	combatStatLabels,
	combatStatShortLabels,
	damageTypeLabels,
	weaponTypeLabels,
} from "../../../game/displayLabels";
import {
	formatModifierValue,
	getNumericModifierTone,
	getToneTextClassName,
} from "../../../game/effectDisplay";
import { HeroStatValue, type HeroDerivedValue } from "./HeroStatValue";

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
		<div className="grid gap-3">
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

function getActiveAffinityLabels(affinities: AffinityCollection) {
	return affinities
		.filter((affinity) => affinity.value)
		.map((affinity) => damageTypeLabels[affinity.damageType]);
}

function ValueGroup({ label, values }: { label: string; values: readonly string[] }) {
	return (
		<div className="grid grid-cols-[7rem_minmax(0,1fr)] items-start gap-3">
			<p className="text-text-label">{label}</p>
			<SidebarValueList values={values} />
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
							<Badge label={value} variant="muted" />
						</li>
					))}
				</ul>
			) : (
				<EmptySidebarText>None</EmptySidebarText>
			)}
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
	return formatModifierValue(modifier.operation, modifier.value);
}

function getDamageModifierClassName(modifier: DamageModifier) {
	return getToneTextClassName(getNumericModifierTone(modifier.operation, modifier.value));
}
