import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "axe_of_the_frozen_wastes",
	name: "Axe of the Frozen Wastes",
	description:
		"The Axe of the Frozen Wastes features a shimmering blade adorned with frost patterns. Designed for powerful swings, it delivers chilling damage, freezing foes in their tracks. Favored by northern warriors, this axe embodies the strength and harshness of winter.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O4a6m6kRcxAc9j7bxwQ?alt=media&token=5e03787f-da34-4b9d-b654-a08730f1624c",
	price: 1440,
	rarity: "common",
	type: "weapon",
	weaponType: "axe",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10+4",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
		},
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 50,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "cold",
					dice: "1d7+3",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
