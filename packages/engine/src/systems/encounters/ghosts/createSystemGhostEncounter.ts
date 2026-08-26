import {
	CLASSES_BY_ID,
	ITEMBASES_BY_ID,
	SKILLS_BY_ID,
	equipmentSlots,
	systemGhosts,
	type EquipmentSlot,
	type SystemGhost,
} from "@app/content";

import { createContextRngState } from "../../../core/rng";
import { heroStateSchema, type GhostEncounter, type HeroEquipmentState } from "../../../schemas";
import { createInitialHeroState } from "../../../state/createInitialHeroState";
import { getValidEquipmentSlots } from "../../equipment/getValidEquipmentSlots";
import { deriveHeroStats } from "../../hero/deriveHeroStats";
import { createGeneratedItemInstance } from "../../items/createGeneratedItemInstance";
import { isClassProficientWithItem } from "../../items/isClassProficientWithItem";
import { isItemBaseEligibleForRarity } from "../../items/isItemBaseEligibleForRarity";
import { calculateMaxHpForLevel } from "../../progression/health/calculateMaxHpForLevel";

const SYSTEM_GHOST_USERNAME = "The Forgotten";
const SYSTEM_GHOST_ID_PREFIX = "system-ghost:";

export function createSystemGhostEncounter(encounterLevel: number): GhostEncounter {
	const definition = systemGhosts.find((ghost) => ghost.encounterLevel === encounterLevel);
	if (!definition) {
		throw new Error(`No system ghost is defined for encounter level ${encounterLevel}`);
	}

	const ghostId = `${SYSTEM_GHOST_ID_PREFIX}${definition.id}`;
	const initialHero = createInitialHeroState({
		runId: ghostId,
		heroName: definition.name,
		classId: definition.classId,
		seed: definition.id,
	});
	const classDefinition = CLASSES_BY_ID[definition.classId];
	const maxHp = calculateMaxHpForLevel(
		classDefinition.combat.hitDie,
		classDefinition.attributes.constitution,
		definition.heroLevel,
	);
	const heroWithAuthoredBuild = {
		...initialHero,
		level: definition.heroLevel,
		xp: 0,
		maxHp,
		currentHp: maxHp,
		skills: [...classDefinition.combat.skillIds, ...definition.additionalSkillIds].map(
			(skillId) => {
				const skill = SKILLS_BY_ID[skillId];
				return {
					skillId,
					...(skill.maxUses ? { chargesRemaining: skill.maxUses } : {}),
				};
			},
		),
		featIds: [...definition.featIds],
		equipment: applyEquipmentRecipes(initialHero.equipment, definition),
		pendingLevelUp: null,
		healingPotions: 0,
	};
	const derivedMaxHp = deriveHeroStats(heroWithAuthoredBuild).health.maxHp;
	const hero = heroStateSchema.parse({
		...heroWithAuthoredBuild,
		currentHp: derivedMaxHp,
	});

	return {
		ghostId,
		ghostUsername: SYSTEM_GHOST_USERNAME,
		ghostSource: "system",
		hero,
	};
}

function applyEquipmentRecipes(
	initialEquipment: HeroEquipmentState,
	definition: SystemGhost,
): HeroEquipmentState {
	const equipment = { ...initialEquipment };
	const classDefinition = CLASSES_BY_ID[definition.classId];

	for (const slot of equipmentSlots) {
		const recipe = definition.equipment[slot];
		if (!recipe) {
			continue;
		}

		const base = ITEMBASES_BY_ID[recipe.baseId];
		validateEquipmentRecipe(definition, slot, base, recipe.rarity);
		if (!isClassProficientWithItem(classDefinition, base)) {
			throw new Error(
				`System ghost ${definition.id} is not proficient with ${recipe.baseId}`,
			);
		}

		equipment[slot] = createGeneratedItemInstance({
			instanceId: `${SYSTEM_GHOST_ID_PREFIX}${definition.id}:equipment:${slot}`,
			base,
			rarity: recipe.rarity,
			rngState: createContextRngState(definition.id, "system-ghost-equipment", slot),
		}).value;
	}

	return equipment;
}

function validateEquipmentRecipe(
	definition: SystemGhost,
	slot: EquipmentSlot,
	base: (typeof ITEMBASES_BY_ID)[keyof typeof ITEMBASES_BY_ID],
	rarity: SystemGhost["equipment"][EquipmentSlot] extends infer T
		? NonNullable<T> extends { rarity: infer R }
			? R
			: never
		: never,
): void {
	if (!getValidEquipmentSlots(base).includes(slot)) {
		throw new Error(`System ghost ${definition.id} cannot equip ${base.id} in ${slot}`);
	}
	if (!isItemBaseEligibleForRarity(base, rarity)) {
		throw new Error(`System ghost ${definition.id} cannot generate ${base.id} at ${rarity}`);
	}
}
