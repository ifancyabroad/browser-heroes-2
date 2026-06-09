import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "righteous_hammer",
	name: "Righteous Hammer",
	description: "",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-OAsgUrk7rmoefD3EbAf?alt=media&token=8fae1bc6-8ec8-4493-8da8-34adfe403c30",
	price: 270,
	rarity: "common",
	type: "weapon",
	weaponType: "hammer",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10+1",
		type: "crushing",
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
					damageType: "radiant",
					dice: "1d6",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
