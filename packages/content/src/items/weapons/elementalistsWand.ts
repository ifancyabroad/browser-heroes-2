import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "elementalists_wand",
	name: "Elementalist's Wand",
	description:
		"A beautifully crafted wand adorned with symbols of fire, water, earth, and air, balancing all four elements within a single weapon.",
	icon: "items/weapons/wands/Wand_v2_72.png",
	price: 3200,
	rarity: "legendary",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	attackRange: "ranged",
	damage: {
		dice: "1d4+4",
		type: "cold",
		damageClass: "magical",
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
					damageClass: "magical",
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
					damageClass: "magical",
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
					damageClass: "physical",
					dice: "1d4",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
