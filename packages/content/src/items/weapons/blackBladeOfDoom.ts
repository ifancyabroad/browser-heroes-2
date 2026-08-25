import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "black_blade_of_doom",
	name: "Black Blade of Doom",
	description:
		"A jet-black greatsword wreathed in hellfire. Its critical blows pronounce doom upon their victims, leaving them vulnerable to every curse that follows.",
	icon: "items/weapons/swords/Sword_26.png",
	price: 5400,
	rarity: "legendary",
	type: "weapon",
	weaponType: "greatsword",
	handedness: "twoHanded",
	attackRange: "melee",
	damage: {
		dice: "2d6+4",
		type: "slashing",
		damageClass: "physical",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
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
					damageType: "fire",
					damageClass: "magical",
					dice: "2d6",
					requiresAttackRoll: false,
				},
			],
		},
		{
			timing: "onCrit",
			effects: [
				{
					type: "modifyRoll",
					target: "enemy",
					roll: "savingThrow",
					mode: "disadvantage",
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
	tags: [],
});
