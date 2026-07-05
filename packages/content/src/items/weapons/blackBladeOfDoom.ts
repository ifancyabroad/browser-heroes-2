import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "black_blade_of_doom",
	name: "Black Blade of Doom",
	description:
		"The Black Blade of Doom is a dark, menacing sword with a jet-black blade that seems to absorb light. Infused with malevolent energy, it curses those it strikes, sowing despair among enemies. This blade is favored by dark warriors and necromancers seeking to unleash chaos and destruction.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-NNwRG-llD60pf8sSKeM?alt=media&token=de76b657-3136-49fc-aaa2-b619a0a2d381",
	price: 1720,
	rarity: "epic",
	type: "weapon",
	weaponType: "sword",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+7",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 50,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "1d8+3",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
