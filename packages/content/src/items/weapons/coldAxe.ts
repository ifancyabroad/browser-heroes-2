import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "cold_axe",
	name: "Cold Axe",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsbhNIeaU_KfAgoA5W?alt=media&token=e233c8b8-b15b-47eb-a111-0ea2a7adf7d1",
	price: 260,
	rarity: "uncommon",
	type: "weapon",
	weaponType: "axe",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d6+1",
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
					damageType: "cold",
					dice: "1d4",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
