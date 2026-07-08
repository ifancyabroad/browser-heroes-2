import {
	CLASSES_BY_ID,
	equipmentSlots,
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

export type CreateInitialHeroStateInput = {
	runId: string;
	heroName: string;
	classId: ClassId;
};

export function createInitialHeroState(input: CreateInitialHeroStateInput): HeroState {
	const classDefinition = CLASSES_BY_ID[input.classId];
	const maxHp = calculateMaxHpForLevel(
		classDefinition.combat.hitDie,
		classDefinition.attributes.constitution,
		1,
	);

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
		equipment: createInitialEquipment(classDefinition, input.runId),
		pendingLevelUp: null,
		healingPotions: STARTING_HEALING_POTIONS,
	};

	return heroStateSchema.parse(hero);
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

function createInitialEquipment(classDefinition: Class, runId: string): HeroEquipmentState {
	const equipment: HeroEquipmentState = {
		...EMPTY_EQUIPMENT,
	};

	for (const slot of equipmentSlots) {
		const itemId = classDefinition.startingEquipment?.[slot];

		if (!itemId) {
			continue;
		}

		equipment[slot] = {
			instanceId: createStartingItemInstanceId(runId, slot),
			itemId,
		};
	}

	return equipment;
}
