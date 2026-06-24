import { CLASSES_BY_ID, type FeatId } from "@app/content";

import type { CombatantState, HeroState } from "../../../schemas";

import { createCombatantId } from "../../../core/ids";
import { PLAYER_UNARMED_ATTACK } from "../constants/combatDefaults";
import { calculatePlayerArmourClass } from "../equipment/calculateArmourClass";
import { getEquippedItems } from "../equipment/getEquippedItems";
import { getEquippedWeapon } from "../equipment/getEquippedWeapon";
import { isHeroWeaponProficient } from "../equipment/weaponProficiency";
import { applyAttributeModifiers } from "../modifiers/applyAttributeModifiers";
import { applyPassiveDamageAffinities } from "../modifiers/applyDamageAffinityModifiers";
import { collectPassiveModifiers } from "../modifiers/collectPassiveModifiers";
import { calculatePlayerProficiencyBonus } from "../rules/calculateProficiencyBonus";
import { EMPTY_DAMAGE_AFFINITIES } from "../constants/combatDefaults";
import { createCombatantSkillFromHeroSkill } from "./combatantSkills";

export function createPlayerCombatant(hero: HeroState, combatId: string): CombatantState {
	const classDefinition = CLASSES_BY_ID[hero.classId];
	const items = getEquippedItems(hero.equipment);

	const featIds: FeatId[] = [...new Set([...classDefinition.combat.featIds, ...hero.featIds])];

	const passiveModifiers = collectPassiveModifiers(items, featIds);

	const attributes = applyAttributeModifiers(hero.attributes, passiveModifiers);

	const weapon = getEquippedWeapon(hero.equipment.mainHand?.itemId);

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
		basicAttack: weapon
			? {
					name: weapon.name,
					attackAttribute: weapon.damage.attribute,
					proficient: isHeroWeaponProficient(hero, weapon),
					damage: weapon.damage,
				}
			: PLAYER_UNARMED_ATTACK,
		skills: hero.skills.map(createCombatantSkillFromHeroSkill),
		featIds,
		activeEffects: [],
	};
}
