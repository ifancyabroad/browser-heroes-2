import {
	CLASSES_BY_ID,
	FEATS_BY_ID,
	ITEMS_BY_ID,
	SKILLS_BY_ID,
	type Attribute,
	type Enemy,
	type Item,
	type ItemId,
	type ItemModifier,
	type ModifiableStat,
	type ModifierOperation,
	type PassiveModifier,
	type PassiveDamageAffinityModifier,
	type Weapon,
} from "@app/content";
import type {
	CombatantState,
	CombatantSkillState,
	HeroEquipmentState,
	HeroSkillState,
	HeroState,
} from "../../schemas";
import { calculateAttributeModifier } from "../../core/attributes";
import { getMaximumDiceValue } from "../../core/dice";
import { createCombatantId } from "../../core/ids";

type DamageAffinities = CombatantState["damageAffinities"];
type CombatModifier = ItemModifier | PassiveModifier;

const EMPTY_DAMAGE_AFFINITIES: DamageAffinities = {
	resistances: [],
	immunities: [],
	vulnerabilities: [],
};

const PLAYER_UNARMED_ATTACK: CombatantState["basicAttack"] = {
	name: "Unarmed Strike",
	attackAttribute: "strength",
	proficient: true,
	damage: {
		dice: "1d4",
		type: "crushing",
		attribute: "strength",
	},
};

export function createPlayerCombatantFromHero(hero: HeroState, combatId: string): CombatantState {
	const classDefinition = CLASSES_BY_ID[hero.classId];
	const items = getEquippedItems(hero.equipment);
	const featIds = uniqueIds([...classDefinition.combat.featIds, ...hero.featIds]);
	const passiveModifiers = getPassiveModifiers(items, featIds);
	const attributes = applyAttributeModifiers(hero.attributes, passiveModifiers);
	const basicAttackWeapon = getEquippedWeapon(hero.equipment.mainHand?.itemId);

	return {
		id: createCombatantId(combatId, "player"),
		side: "player",
		sourceId: hero.classId,
		name: hero.name,
		level: hero.level,
		maxHp: hero.maxHp,
		currentHp: hero.currentHp,
		attributes,
		armourClass: calculatePlayerArmourClass(
			hero.equipment,
			attributes.dexterity,
			passiveModifiers,
		),
		proficiencyBonus: calculatePlayerProficiencyBonus(hero.level, passiveModifiers),
		savingThrowProficiencies: classDefinition.proficiencies.savingThrows,
		damageAffinities: applyPassiveDamageAffinities(EMPTY_DAMAGE_AFFINITIES, passiveModifiers),
		basicAttack: basicAttackWeapon
			? {
					name: basicAttackWeapon.name,
					attackAttribute: basicAttackWeapon.damage.attribute,
					proficient: isHeroWeaponProficient(hero, basicAttackWeapon),
					damage: basicAttackWeapon.damage,
				}
			: PLAYER_UNARMED_ATTACK,
		skills: hero.skills.map(mapHeroSkill),
		featIds,
		activeEffects: [],
	};
}

export function createEnemyCombatantFromDefinition(enemy: Enemy, combatId: string): CombatantState {
	const featIds = uniqueIds(enemy.combat.featIds);
	const passiveModifiers = getPassiveModifiers([], featIds);
	const attributes = applyAttributeModifiers(enemy.attributes, passiveModifiers);
	const maxHp = getMaximumDiceValue(enemy.combat.hitDice);

	return {
		id: createCombatantId(combatId, "enemy"),
		side: "enemy",
		sourceId: enemy.id,
		name: enemy.name,
		level: enemy.level,
		maxHp,
		currentHp: maxHp,
		attributes,
		armourClass: Math.max(
			0,
			Math.floor(
				applyPassiveStatModifiers(
					"armourClass",
					enemy.combat.armourClass,
					passiveModifiers,
				),
			),
		),
		proficiencyBonus: Math.max(
			0,
			Math.floor(
				applyPassiveStatModifiers(
					"proficiencyBonus",
					enemy.combat.proficiencyBonus,
					passiveModifiers,
				),
			),
		),
		savingThrowProficiencies: enemy.proficiencies.savingThrows,
		damageAffinities: applyPassiveDamageAffinities(
			enemy.combat.damageAffinities,
			passiveModifiers,
		),
		basicAttack: {
			...enemy.combat.basicAttack,
			proficient: true,
		},
		skills: enemy.combat.skills.map(mapContentSkill),
		featIds,
		activeEffects: [],
	};
}

function isHeroWeaponProficient(hero: HeroState, weapon: Weapon): boolean {
	return CLASSES_BY_ID[hero.classId].proficiencies.weaponTypes.includes(weapon.weaponType);
}

export function syncHeroFromPlayerCombatant(hero: HeroState, player: CombatantState): HeroState {
	return {
		...hero,
		maxHp: player.maxHp,
		currentHp: player.currentHp,
		skills: hero.skills.map((heroSkill) => {
			const combatSkill = player.skills.find((skill) => skill.skillId === heroSkill.skillId);

			if (!combatSkill) {
				return heroSkill;
			}

			return {
				...heroSkill,
				chargesRemaining: combatSkill.chargesRemaining,
			};
		}),
	};
}

function getEquippedItems(equipment: HeroEquipmentState): Item[] {
	return Object.values(equipment).flatMap((item) => {
		if (!item) {
			return [];
		}

		return [ITEMS_BY_ID[item.itemId]];
	});
}

function calculatePlayerArmourClass(
	equipment: HeroEquipmentState,
	dexterityScore: number,
	passiveModifiers: readonly CombatModifier[],
): number {
	const bodyArmour = getEquippedBodyArmour(equipment.body?.itemId);
	const dexterityModifier = calculateAttributeModifier(dexterityScore);
	const baseArmourClass = bodyArmour
		? calculateArmourClassFromBodyArmour(bodyArmour, dexterityModifier)
		: 10 + dexterityModifier;

	return Math.max(
		0,
		Math.floor(applyPassiveStatModifiers("armourClass", baseArmourClass, passiveModifiers)),
	);
}

function calculateArmourClassFromBodyArmour(
	armour: Extract<Item, { type: "armour"; slot: "body" }>,
	dexterityModifier: number,
): number {
	switch (armour.category) {
		case "cloth":
		case "light":
			return armour.armourClass + dexterityModifier;
		case "medium":
			return armour.armourClass + Math.min(2, Math.max(0, dexterityModifier));
		case "heavy":
			return armour.armourClass;
	}
}

function calculatePlayerProficiencyBonus(
	level: number,
	passiveModifiers: readonly CombatModifier[],
): number {
	const baseBonus = 2 + Math.floor((Math.max(1, level) - 1) / 4);

	return Math.max(
		0,
		Math.floor(applyPassiveStatModifiers("proficiencyBonus", baseBonus, passiveModifiers)),
	);
}

function applyAttributeModifiers(
	attributes: CombatantState["attributes"],
	modifiers: readonly CombatModifier[],
): CombatantState["attributes"] {
	return {
		strength: applyAttributeModifier("strength", attributes.strength, modifiers),
		dexterity: applyAttributeModifier("dexterity", attributes.dexterity, modifiers),
		constitution: applyAttributeModifier("constitution", attributes.constitution, modifiers),
		intelligence: applyAttributeModifier("intelligence", attributes.intelligence, modifiers),
		wisdom: applyAttributeModifier("wisdom", attributes.wisdom, modifiers),
		charisma: applyAttributeModifier("charisma", attributes.charisma, modifiers),
	};
}

function applyAttributeModifier(
	attribute: Attribute,
	baseValue: number,
	modifiers: readonly CombatModifier[],
): number {
	return Math.floor(applyPassiveStatModifiers(attribute, baseValue, modifiers));
}

function applyPassiveStatModifiers(
	stat: ModifiableStat,
	baseValue: number,
	modifiers: readonly CombatModifier[],
): number {
	return modifiers.reduce((value, modifier) => {
		if (modifier.type !== "modifyStat" || modifier.stat !== stat) {
			return value;
		}

		return applyModifierOperation(value, modifier.operation, modifier.value);
	}, baseValue);
}

function applyPassiveDamageAffinities(
	baseAffinities: DamageAffinities,
	modifiers: readonly CombatModifier[],
): DamageAffinities {
	return modifiers.reduce<DamageAffinities>(
		(affinities, modifier) => {
			if (modifier.type !== "modifyDamageAffinity") {
				return affinities;
			}

			return applyDamageAffinityModifier(affinities, modifier);
		},
		{
			resistances: [...baseAffinities.resistances],
			immunities: [...baseAffinities.immunities],
			vulnerabilities: [...baseAffinities.vulnerabilities],
		},
	);
}

function applyDamageAffinityModifier(
	affinities: DamageAffinities,
	modifier: PassiveDamageAffinityModifier,
): DamageAffinities {
	const key = getDamageAffinityCollection(modifier.affinity);
	const currentValues = affinities[key];
	const nextValues =
		modifier.operation === "add"
			? uniqueIds([...currentValues, modifier.damageType])
			: currentValues.filter((damageType) => damageType !== modifier.damageType);

	return {
		...affinities,
		[key]: nextValues,
	};
}

function getDamageAffinityCollection(
	affinity: PassiveDamageAffinityModifier["affinity"],
): keyof DamageAffinities {
	switch (affinity) {
		case "resistance":
			return "resistances";
		case "immunity":
			return "immunities";
		case "vulnerability":
			return "vulnerabilities";
	}
}

function applyModifierOperation(
	baseValue: number,
	operation: ModifierOperation,
	modifierValue: number,
): number {
	switch (operation) {
		case "add":
			return baseValue + modifierValue;
		case "multiply":
			return baseValue * modifierValue;
		case "set":
			return modifierValue;
	}
}

function getPassiveModifiers(
	items: readonly Item[],
	featIds: readonly CombatantState["featIds"][number][],
): CombatModifier[] {
	return [
		...items.flatMap((item) => item.modifiers),
		...featIds.flatMap((featId) => FEATS_BY_ID[featId].modifiers),
	];
}

function getEquippedWeapon(itemId: ItemId | undefined): Weapon | null {
	if (!itemId) {
		return null;
	}

	const item = ITEMS_BY_ID[itemId];

	return item.type === "weapon" ? item : null;
}

function getEquippedBodyArmour(
	itemId: ItemId | undefined,
): Extract<Item, { type: "armour"; slot: "body" }> | null {
	if (!itemId) {
		return null;
	}

	const item = ITEMS_BY_ID[itemId];

	return item.type === "armour" && item.slot === "body" ? item : null;
}

function mapHeroSkill(skill: HeroSkillState): CombatantSkillState {
	return {
		skillId: skill.skillId,
		rank: skill.rank,
		chargesRemaining: skill.chargesRemaining,
	};
}

function mapContentSkill(skill: Enemy["combat"]["skills"][number]): CombatantSkillState {
	const skillDefinition = SKILLS_BY_ID[skill.skillId];

	return {
		skillId: skill.skillId,
		rank: skill.rank,
		chargesRemaining: skillDefinition.maxUses,
	};
}

function uniqueIds<T extends string>(ids: readonly T[]): T[] {
	return [...new Set(ids)];
}
