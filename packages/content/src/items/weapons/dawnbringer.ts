import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "dawnbringer",
	name: "Dawnbringer",
	description:
		"A radiant greatsword forged to carry the light of dawn, scorching the wicked and raising a divine barrier around those who wield it.",
	icon: "items/weapons/swords/Sword_v2_50.png",
	price: 6000,
	rarity: "legendary",
	type: "weapon",
	weaponType: "greatsword",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "2d6+5",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
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
					damageType: "radiant",
					dice: "2d6",
					requiresAttackRoll: false,
				},
			],
		},
		{
			timing: "onCrit",
			effects: [
				{
					type: "shield",
					target: "self",
					amount: 20,
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
	tags: [],
});
