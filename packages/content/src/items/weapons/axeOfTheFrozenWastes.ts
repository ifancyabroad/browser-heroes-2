import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "axe_of_the_frozen_wastes",
	name: "Axe of the Frozen Wastes",
	description:
		"The Axe of the Frozen Wastes features a shimmering blade adorned with frost patterns. Designed for powerful swings, it delivers chilling damage, freezing foes in their tracks. Favored by northern warriors, this axe embodies the strength and harshness of winter.",
	icon: "items/weapons/axes/Axe_v2_46.png",
	price: 1440,
	rarity: "legendary",
	type: "weapon",
	weaponType: "battleaxe",
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
					dice: "2d6",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
