import type { CombatantBasicAttack, CombatantState, HeroState } from "../../../schemas";

import { createCombatantId } from "../../../core/ids";
import { PLAYER_UNARMED_ATTACK } from "../constants/combatDefaults";
import { getEquippedWeapon } from "../../equipment/getEquippedWeapon";
import { isHeroWeaponProficient } from "../equipment/weaponProficiency";
import { toCombatantCombatStats } from "../modifiers/deriveCombatStats";
import { createCombatantSkillFromHeroSkill } from "./combatantSkills";
import { deriveHeroStats } from "../../hero/deriveHeroStats";
import { CLASSES_BY_ID, type Weapon } from "@app/content";

export function createPlayerCombatant(hero: HeroState, combatId: string): CombatantState {
	const derivedHeroStats = deriveHeroStats(hero);

	const attributes = derivedHeroStats.effectiveAttributes;

	const combatStats = toCombatantCombatStats(derivedHeroStats.combatStats);

	const mainHandWeapon = getEquippedWeapon(hero.equipment.mainHand);
	const offHandWeapon = getEquippedWeapon(hero.equipment.offHand);

	const classDefinition = CLASSES_BY_ID[hero.classId];

	return {
		id: createCombatantId(combatId, "player"),
		side: "player",
		sourceId: hero.classId,
		name: hero.name,
		portrait: classDefinition.portrait,
		level: hero.level,
		maxHp: derivedHeroStats.health.maxHp,
		currentHp: derivedHeroStats.health.currentHp,
		attributes,
		combatStats,
		savingThrowProficiencies: derivedHeroStats.proficiencies.savingThrows,
		basicAttack: mainHandWeapon
			? createWeaponBasicAttack(hero, mainHandWeapon)
			: PLAYER_UNARMED_ATTACK,

		offHandBasicAttack: offHandWeapon ? createWeaponBasicAttack(hero, offHandWeapon) : null,
		skills: hero.skills.map(createCombatantSkillFromHeroSkill),
		featIds: derivedHeroStats.featIds,
		activeEffects: [],
		tactic: "default",
	};
}

function createWeaponBasicAttack(hero: HeroState, weapon: Weapon): CombatantBasicAttack {
	return {
		name: weapon.name,
		attackRange: weapon.attackRange,
		attackAttribute: weapon.damage.attribute,
		proficient: isHeroWeaponProficient(hero, weapon),
		damage: weapon.damage,
		attackRiders: weapon.attackRiders,
	};
}
