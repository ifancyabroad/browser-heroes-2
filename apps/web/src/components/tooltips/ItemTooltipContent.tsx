import type { AttackRider, EquipmentSlot, Item, ItemRarity } from "@app/content";
import clsx from "clsx";
import {
	armourCategoryLabels,
	armourSlotLabels,
	attributeShortLabels,
	damageTypeLabels,
	equipmentSlotLabels,
	itemRarityLabels,
	weaponHandednessLabels,
	weaponRangeLabels,
	weaponTypeLabels,
} from "../../game/displayLabels";
import {
	formatItemModifier,
	formatRiderEffect,
	formatSavingThrow,
	formatTitle,
	getModifierTextClassName,
} from "../../game/effectDisplay";
import {
	TooltipDetailList,
	type TooltipDetailRow,
	TooltipSection,
} from "./TooltipContentPrimitives";

type ItemTooltipContentProps = {
	item: Item;
	slot: EquipmentSlot;
};

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

			<TooltipDetailList rows={getItemDetailRows(item, slot)} />

			{item.modifiers.length > 0 && (
				<TooltipSection title="Modifiers">
					<ul className="grid gap-1">
						{item.modifiers.map((modifier, index) => (
							<li
								key={`${modifier.type}-${index}`}
								className={clsx("break-words", getModifierTextClassName(modifier))}
							>
								{formatItemModifier(modifier)}
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

function getItemDetailRows(item: Item, slot: EquipmentSlot): TooltipDetailRow[] {
	const rows: TooltipDetailRow[] = [
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
