import clsx from "clsx";
import {
	attackRangeLabels,
	attributeLabels,
	damageClassLabels,
	itemRarityLabels,
} from "../../presentation/labels";
import { formatItemModifier, getModifierTextClassName } from "../../presentation/effects";
import {
	getItemKindLabel,
	getItemRarityTextClassName,
	getPrimaryItemStat,
} from "../../presentation/items";
import {
	TooltipDetailList,
	type TooltipDetailRow,
	TooltipSection,
} from "./TooltipContentPrimitives";
import { AttackRiderTooltipList } from "./AttackRiderTooltipList";
import type { RuntimeItem } from "@app/engine";
import { resolveImageUrl } from "../../utils/image";

type ItemTooltipContentProps = {
	item: RuntimeItem;
};

export function ItemTooltipContent({ item }: ItemTooltipContentProps) {
	return (
		<div className="grid gap-3">
			<header className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3">
				<span className="h-14 w-14 overflow-hidden border-2 border-bg-elevated bg-bg-base">
					<img
						src={resolveImageUrl(item.icon)}
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
					<p className="text-text">{itemRarityLabels[item.rarity]}</p>
				</div>
			</header>

			<TooltipDetailList rows={getItemDetailRows(item)} />

			{item.modifiers.length > 0 && (
				<TooltipSection title="Bonuses">
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
					<AttackRiderTooltipList riders={item.attackRiders} />
				</TooltipSection>
			)}
		</div>
	);
}

function getItemDetailRows(item: RuntimeItem): TooltipDetailRow[] {
	const rows: TooltipDetailRow[] = [{ label: "Type", value: getItemKindLabel(item) }];
	const primaryStat = getPrimaryItemStat(item);

	if (item.type === "weapon") {
		return [
			...rows,
			...(primaryStat ? [{ ...primaryStat, valueClassName: "text-text-bright" }] : []),
			{
				label: "Attack",
				value: `${damageClassLabels[item.damage.damageClass]} / ${attackRangeLabels[item.attackRange]}`,
			},
			{ label: "Scaling", value: attributeLabels[item.damage.attribute] },
		];
	}

	return primaryStat ? [...rows, { ...primaryStat, valueClassName: "text-text-bright" }] : rows;
}
