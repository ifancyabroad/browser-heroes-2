import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "flame_axe",
	name: "Flame Axe",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsc6P15nQYmy1HveLm?alt=media&token=d096b492-8ae4-4127-a2e1-6d20e0415071",
	price: 280,
	rarity: "common",
	type: "weapon",
	weaponType: "axe",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10+1",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "1d6",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
