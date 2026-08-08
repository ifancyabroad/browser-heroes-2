import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "axe_of_the_frozen_wastes",
	name: "Axe of the Frozen Wastes",
	description:
		"A frost-patterned battleaxe favoured by northern warriors. Each heavy swing unleashes the merciless cold of the frozen wastes.",
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
			value: 5,
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
