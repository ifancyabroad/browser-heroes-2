import {
	CLASSES_BY_ID,
	equipmentSlots,
	ITEMBASES_BY_ID,
	SKILLS_BY_ID,
	type Class,
	type ClassId,
} from "@app/content";
import {
	type HeroEquipmentState,
	type HeroSkillState,
	heroStateSchema,
	type HeroState,
} from "../schemas";
import { createStartingItemInstanceId } from "../core/ids";
import { calculateMaxHpForLevel } from "../systems/progression/health/calculateMaxHpForLevel";
import { STARTING_HEALING_POTIONS } from "../systems/consumables/healingPotionConstants";
import type { RngResult, RngState } from "../core/rng";
import { createGeneratedItemInstance } from "../systems/items/createGeneratedItemInstance";
import { canEquipItemLike } from "../systems/items/canEquipItemLike";
import { getValidEquipmentSlots } from "../systems/equipment/getValidEquipmentSlots";

export type CreateInitialHeroStateInput = {
	runId: string;
	heroName: string;
	classId: ClassId;
	rngState: RngState;
};

export function createInitialHeroState(input: CreateInitialHeroStateInput): RngResult<HeroState> {
	const classDefinition = CLASSES_BY_ID[input.classId];
	const maxHp = calculateMaxHpForLevel(
		classDefinition.combat.hitDie,
		classDefinition.attributes.constitution,
		1,
	);

	const equipmentResult = createInitialEquipment(classDefinition, input.runId, input.rngState);

	const hero: HeroState = {
		id: "player",
		name: input.heroName,
		classId: input.classId,
		level: 1,
		xp: 0,
		maxHp,
		currentHp: maxHp,
		attributes: classDefinition.attributes,
		skills: createInitialSkills(classDefinition),
		featIds: [],
		equipment: equipmentResult.value,
		pendingLevelUp: null,
		healingPotions: STARTING_HEALING_POTIONS,
	};

	return {
		value: heroStateSchema.parse(hero),
		rngState: equipmentResult.rngState,
	};
}

function createInitialSkills(classDefinition: Class): HeroSkillState[] {
	return classDefinition.combat.skillIds.map((skillId) => {
		const skillDefinition = SKILLS_BY_ID[skillId];

		const mappedSkill: HeroSkillState = {
			skillId,
		};

		if (skillDefinition.maxUses) {
			mappedSkill.chargesRemaining = skillDefinition.maxUses;
		}

		return mappedSkill;
	});
}

const EMPTY_EQUIPMENT: HeroEquipmentState = {
	head: null,
	neck: null,
	body: null,
	hands: null,
	finger1: null,
	finger2: null,
	waist: null,
	feet: null,
	mainHand: null,
	offHand: null,
};

function createInitialEquipment(
	classDefinition: Class,
	runId: string,
	initialRngState: RngState,
): RngResult<HeroEquipmentState> {
	const equipment: HeroEquipmentState = {
		...EMPTY_EQUIPMENT,
	};

	let rngState = initialRngState;

	const mainHandBaseId = classDefinition.startingEquipment?.mainHand;
	const offHandBaseId = classDefinition.startingEquipment?.offHand;

	if (mainHandBaseId && offHandBaseId) {
		const mainHandBase = ITEMBASES_BY_ID[mainHandBaseId];

		if (mainHandBase.type === "weapon" && mainHandBase.handedness === "twoHanded") {
			throw new Error(
				`Class ${classDefinition.id} cannot start with an off-hand item while using two-handed base ${mainHandBaseId}`,
			);
		}
	}

	for (const slot of equipmentSlots) {
		const itemBaseId = classDefinition.startingEquipment?.[slot];

		if (!itemBaseId) {
			continue;
		}

		const base = ITEMBASES_BY_ID[itemBaseId];

		if (!canEquipItemLike(classDefinition, base)) {
			throw new Error(
				`Class ${classDefinition.id} cannot equip starting item base ${itemBaseId}`,
			);
		}

		if (!getValidEquipmentSlots(base).includes(slot)) {
			throw new Error(`Starting item base ${itemBaseId} cannot occupy slot ${slot}`);
		}

		const itemResult = createGeneratedItemInstance({
			instanceId: createStartingItemInstanceId(runId, slot),
			base,
			level: 1,
			rarity: "common",
			rngState,
		});

		equipment[slot] = itemResult.value;
		rngState = itemResult.rngState;
	}

	return {
		value: equipment,
		rngState,
	};
}
