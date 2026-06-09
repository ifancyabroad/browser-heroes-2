import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "twin_shot",
	name: "Twin Shot",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsdWReq3s0PRRvYZlL?alt=media&token=0fe9bb49-8d14-437d-965c-64a4aa44ae95",
	price: 270,
	rarity: "common",
	type: "weapon",
	weaponType: "crossbow",
	handedness: "twoHanded",
	range: "ranged",
	damage: {
		dice: "1d8+1",
		type: "piercing",
		attribute: "dexterity",
	},
	modifiers: [],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "1d6",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
