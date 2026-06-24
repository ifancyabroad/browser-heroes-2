import {
	type FeatId,
	FEATS_BY_ID,
	type Item,
	type ItemModifier,
	type PassiveModifier,
} from "@app/content";

type CombatModifier = ItemModifier | PassiveModifier;

export function collectPassiveModifiers(
	items: readonly Item[],
	featIds: readonly FeatId[],
): CombatModifier[] {
	return [
		...items.flatMap((item) => item.modifiers),
		...featIds.flatMap((featId) => FEATS_BY_ID[featId].modifiers),
	];
}
