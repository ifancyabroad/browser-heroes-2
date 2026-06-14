import {
	CLASSES_BY_ID,
	equipmentSlots,
	itemIdSchema,
	skillIdSchema,
	SKILLS_BY_ID,
	type ClassDefinition,
	type ClassId,
} from "@app/content";
import {
	type HeroEquipmentState,
	type HeroSkillState,
	heroStateSchema,
	type HeroState,
} from "../schemas";
import { createStartingItemInstanceId } from "../core/ids";
import { calculateStartingHp } from "../systems/progression/calculateStartingHp";

export type CreateInitialHeroStateInput = {
	runId: string;
	heroName: string;
	classId: ClassId;
};

export function createInitialHeroState(input: CreateInitialHeroStateInput): HeroState {
	const classDefinition = CLASSES_BY_ID[input.classId];
	const maxHp = calculateStartingHp(
		classDefinition.combat.hitDie,
		classDefinition.attributes.constitution,
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
	};

	return heroStateSchema.parse(hero);
}

function createInitialSkills(classDefinition: ClassDefinition): HeroSkillState[] {
	return classDefinition.combat.skills.map((skill) => {
		const validatedSkillId = skillIdSchema.parse(skill.skillId);
		const skillDefinition = SKILLS_BY_ID[validatedSkillId];

		const mappedSkill: HeroSkillState = {
			skillId: validatedSkillId,
			rank: skill.rank,
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
	classDefinition: ClassDefinition,
	runId: string,
): HeroEquipmentState {
	const equipment: HeroEquipmentState = {
		...EMPTY_EQUIPMENT,
	};

	for (const slot of equipmentSlots) {
		const rawItemId = classDefinition.startingEquipment?.[slot];

		if (!rawItemId) {
			continue;
		}

		equipment[slot] = {
			instanceId: createStartingItemInstanceId(runId, slot),
			itemId: itemIdSchema.parse(rawItemId),
		};
	}

	return equipment;
}
