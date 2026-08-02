import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "dawnbringer",
	name: "Dawnbringer",
	description: "",
	icon: "items/weapons/swords/Sword_v2_50.png",
	price: 3200,
	rarity: "legendary",
	type: "weapon",
	weaponType: "sword",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "2d6+6",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
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
					damageType: "radiant",
					dice: "2d6",
					requiresAttackRoll: false,
				},
			],
		},
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: {
					base: 24,
					attribute: "constitution",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyDamageTaken",
					target: "enemy",
					damageType: "radiant",
					operation: "multiply",
					value: 1.4,
					durationTurns: 2,
				},
				{
					type: "modifyDamageTaken",
					target: "enemy",
					damageType: "slashing",
					operation: "multiply",
					value: 1.4,
					durationTurns: 2,
				},
			],
		},
	],
	tags: [],
});
