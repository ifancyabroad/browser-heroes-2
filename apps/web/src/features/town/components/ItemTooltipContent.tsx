import type {
	AttackRider,
	Attribute,
	EquipmentSlot,
	Item,
	ItemModifier,
	ItemRarity,
	ModifierOperation,
	RiderEffect,
	SavingThrow,
} from "@app/content";
import type { ReactNode } from "react";
import clsx from "clsx";
import {
	armourCategoryLabels,
	armourSlotLabels,
	attributeShortLabels,
	damageTypeLabels,
	equipmentSlotLabels,
	itemRarityLabels,
	modifiableStatLabels,
	weaponHandednessLabels,
	weaponRangeLabels,
	weaponTypeLabels,
} from "../../../game/displayLabels";
import { formatStatNumber } from "./HeroStatValue";

type ItemTooltipContentProps = {
	item: Item;
	slot: EquipmentSlot;
};

type DetailRow = {
	label: string;
	value: string;
};

const damageAffinityLabels = {
	resistance: "Resistance",
	immunity: "Immunity",
	vulnerability: "Vulnerability",
} as const;

const saveOutcomeLabels = {
	noEffect: "no effect",
	halfDamage: "half damage",
} as const;

export function ItemTooltipContent({ item, slot }: ItemTooltipContentProps) {
	return (
		<div className="grid gap-3">
			<header className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3">
				<span className="h-14 w-14 overflow-hidden border border-border bg-bg-base">
					<img
						src={item.icon}
						alt=""
						loading="lazy"
						className="h-full w-full object-cover"
						aria-hidden
					/>
				</span>

				<div className="grid min-w-0 content-center gap-1">
					<p className={clsx("break-words", getItemRarityTextClassName(item.rarity))}>
						{item.name}
					</p>
					<p className="text-text-label">
						{itemRarityLabels[item.rarity]}{" "}
						{item.type === "weapon" ? "Weapon" : "Armour"}
					</p>
				</div>
			</header>

			{item.description && (
				<p className="border-t border-border pt-2 text-text">{item.description}</p>
			)}

			<DetailList rows={getItemDetailRows(item, slot)} />

			{item.modifiers.length > 0 && (
				<TooltipSection title="Modifiers">
					<ul className="grid gap-1">
						{item.modifiers.map((modifier, index) => (
							<li
								key={`${modifier.type}-${index}`}
								className={clsx("break-words", getModifierClassName(modifier))}
							>
								{formatModifier(modifier)}
							</li>
						))}
					</ul>
				</TooltipSection>
			)}

			{item.type === "weapon" && item.attackRiders.length > 0 && (
				<TooltipSection title="Attack Riders">
					<AttackRiderList riders={item.attackRiders} />
				</TooltipSection>
			)}

			{item.tags.length > 0 && (
				<TooltipSection title="Tags">
					<ul className="flex flex-wrap gap-x-2 gap-y-1">
						{item.tags.map((tag) => (
							<li key={tag} className="text-text-bright">
								{formatTitle(tag)}
							</li>
						))}
					</ul>
				</TooltipSection>
			)}
		</div>
	);
}

export function getItemRarityTextClassName(rarity: ItemRarity) {
	switch (rarity) {
		case "common":
			return "text-common";
		case "uncommon":
			return "text-uncommon";
		case "rare":
			return "text-rare";
		case "epic":
			return "text-epic";
		case "legendary":
			return "text-legendary";
	}
}

function getItemDetailRows(item: Item, slot: EquipmentSlot): DetailRow[] {
	const rows: DetailRow[] = [
		{ label: "Equipped", value: equipmentSlotLabels[slot] },
		{ label: "Price", value: `${item.price} gold` },
	];

	if (item.type === "weapon") {
		return [
			...rows,
			{ label: "Type", value: weaponTypeLabels[item.weaponType] },
			{ label: "Hands", value: weaponHandednessLabels[item.handedness] },
			{ label: "Range", value: weaponRangeLabels[item.range] },
			{
				label: "Damage",
				value: `${item.damage.dice} ${damageTypeLabels[item.damage.type]}`,
			},
			{ label: "Attribute", value: attributeShortLabels[item.damage.attribute] },
		];
	}

	return [
		...rows,
		{ label: "Slot", value: armourSlotLabels[item.slot] },
		{ label: "Category", value: armourCategoryLabels[item.category] },
		...(item.slot === "body" ? [{ label: "AC", value: String(item.armourClass) }] : []),
	];
}

function DetailList({ rows }: { rows: readonly DetailRow[] }) {
	return (
		<dl className="grid gap-1 border-t border-border pt-2">
			{rows.map((row) => (
				<div key={row.label} className="flex items-baseline justify-between gap-3">
					<dt className="shrink-0 text-text-label">{row.label}</dt>
					<dd className="min-w-0 break-words text-right text-text-bright">{row.value}</dd>
				</div>
			))}
		</dl>
	);
}

function TooltipSection({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section className="grid gap-1 border-t border-border pt-2" aria-label={title}>
			<p className="text-text-label">{title}</p>
			{children}
		</section>
	);
}

function AttackRiderList({ riders }: { riders: readonly AttackRider[] }) {
	return (
		<ul className="grid gap-2">
			{riders.map((rider, riderIndex) => (
				<li key={`${rider.timing}-${riderIndex}`} className="grid gap-1">
					<p className="text-primary">
						{rider.timing === "onHit" ? "On hit" : "On crit"}
					</p>
					{rider.save && <p className="text-text">{formatSavingThrow(rider.save)}</p>}
					<ul className="grid gap-1">
						{rider.effects.map((effect, effectIndex) => (
							<li key={`${effect.type}-${effectIndex}`} className="text-text-bright">
								{formatRiderEffect(effect)}
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	);
}

function formatModifier(modifier: ItemModifier) {
	switch (modifier.type) {
		case "modifyStat":
			if (modifier.operation === "set") {
				return `Set ${modifiableStatLabels[modifier.stat]} to ${modifier.value}`;
			}

			return `${formatModifierValue(modifier.operation, modifier.value)} ${modifiableStatLabels[modifier.stat]}`;

		case "modifyDamage":
			return `${modifier.damageType ? damageTypeLabels[modifier.damageType] : "All"} damage ${formatModifierValue(modifier.operation, modifier.value)}`;

		case "modifyDamageAffinity":
			return `${modifier.operation === "add" ? "Add" : "Remove"} ${damageTypeLabels[modifier.damageType]} ${damageAffinityLabels[modifier.affinity]}`;
	}
}

function formatModifierValue(operation: ModifierOperation, value: number) {
	if (operation === "multiply") {
		return `x${value}`;
	}

	if (operation === "set") {
		return `= ${value}`;
	}

	return formatStatNumber(value, true);
}

function getModifierClassName(modifier: ItemModifier) {
	if (modifier.type === "modifyDamageAffinity") {
		const improvesDefense =
			(modifier.operation === "add" && modifier.affinity !== "vulnerability") ||
			(modifier.operation === "remove" && modifier.affinity === "vulnerability");

		return improvesDefense ? "text-success" : "text-error";
	}

	if (modifier.operation === "set") {
		return "text-primary";
	}

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

function formatRiderEffect(effect: RiderEffect) {
	switch (effect.type) {
		case "damage":
			return `${formatTarget(effect.target)} takes ${effect.dice} ${damageTypeLabels[effect.damageType]}${formatOptionalAttribute(effect.attribute)}${effect.requiresAttackRoll ? " with attack roll" : ""}${effect.save ? `; ${formatSavingThrow(effect.save)}` : ""}`;

		case "heal":
			return `Heal ${formatTarget(effect.target)} for ${effect.dice}${formatOptionalAttribute(effect.attribute)}`;

		case "applyStatus":
			return `Apply ${formatTitle(effect.statusId)} to ${formatTarget(effect.target)} for ${effect.durationTurns} turns`;

		case "removeStatus":
			return `Remove ${formatRemovedStatuses(effect)} from ${formatTarget(effect.target)}`;

		case "modifyStat":
			return `Modify ${formatTarget(effect.target)} ${modifiableStatLabels[effect.stat]} ${formatModifierValue(effect.operation, effect.value)}${formatOptionalDuration(effect.durationTurns)}`;

		case "modifyDamage":
			return `Modify ${formatTarget(effect.target)} ${effect.damageType ? damageTypeLabels[effect.damageType] : "all"} damage ${formatModifierValue(effect.operation, effect.value)}${formatOptionalDuration(effect.durationTurns)}`;
	}
}

function formatSavingThrow(save: SavingThrow) {
	const dcParts = [
		String(save.dc.base),
		attributeShortLabels[save.dc.attribute],
		save.dc.includeProficiency ? "Prof" : null,
	].filter(Boolean);
	const bonus =
		save.dc.bonus > 0
			? ` + ${save.dc.bonus}`
			: save.dc.bonus < 0
				? ` - ${Math.abs(save.dc.bonus)}`
				: "";

	return `Save ${attributeShortLabels[save.attribute]} vs DC ${dcParts.join(" + ")}${bonus}; ${saveOutcomeLabels[save.onSuccess]}`;
}

function formatOptionalAttribute(attribute: Attribute | undefined) {
	return attribute ? ` + ${attributeShortLabels[attribute]}` : "";
}

function formatOptionalDuration(durationTurns: number | undefined) {
	return durationTurns ? ` for ${durationTurns} turns` : "";
}

function formatTarget(target: "self" | "enemy") {
	return target === "self" ? "Self" : "Enemy";
}

function formatRemovedStatuses(effect: Extract<RiderEffect, { type: "removeStatus" }>) {
	const statuses = [
		...effect.statusIds.map(formatTitle),
		effect.allNegative ? "all negative statuses" : null,
		effect.allPositive ? "all positive statuses" : null,
	].filter(Boolean);

	return statuses.join(", ");
}

function formatTitle(value: string) {
	return value
		.split("_")
		.join(" ")
		.replace(/\b\w/g, (character) => character.toUpperCase());
}
