import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "flame_shot",
	name: "Flame Shot",
	description:
		"Flame Shot is a beautifully crafted bow with fiery engravings along its limbs. When drawn, it ignites arrows in a blaze of fire, unleashing scorching shots that can engulf targets in flames. Favored by skilled archers, this bow is perfect for delivering both precision and destruction.",
	icon: "items/weapons/bows/Bow_v2_05.png",
	price: 1280,
	rarity: "legendary",
	type: "weapon",
	weaponType: "bow",
	handedness: "twoHanded",
	range: "ranged",
	damage: {
		dice: "1d8+4",
		type: "piercing",
		attribute: "dexterity",
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
					dice: "2d6",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
