import { CLASSES_BY_ID, FEATS_BY_ID, ITEMS_BY_ID } from "@app/content";
import type { HeroView } from "@app/engine";

export type ModifierSource =
	HeroView["combatStats"]["damageModifiers"][number]["contributions"][number]["source"];

export function getModifierSourceLabel(source: ModifierSource) {
	switch (source.type) {
		case "item":
			return ITEMS_BY_ID[source.itemId].name;
		case "feat":
			return FEATS_BY_ID[source.featId].name;
		case "class":
			return CLASSES_BY_ID[source.classId].name;
	}
}
