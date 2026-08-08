import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "elementalists_wand",
	name: "Elementalist's Wand",
	description:
		"A beautifully crafted wand adorned with symbols of fire, water, earth, and air, balancing all four elements within a single weapon.",
	icon: "items/weapons/wands/Wand_v2_72.png",
	price: 1060,
	rarity: "legendary",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4+4",
		type: "cold",
		attribute: "intelligence",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 4,
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
					dice: "1d4",
					requiresAttackRoll: false,
				},
			],
		},
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "lightning",
					dice: "1d4",
					requiresAttackRoll: false,
				},
			],
		},
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "1d4",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
