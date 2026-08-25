import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "flame_shot",
	name: "Flame Shot",
	description:
		"Flame Shot is a beautifully crafted bow with fiery engravings along its limbs. When drawn, it ignites arrows in a blaze of fire, unleashing scorching shots that can engulf targets in flames. Favored by skilled archers, this bow is perfect for delivering both precision and destruction.",
	icon: "items/weapons/bows/Bow_v2_05.png",
	price: 3500,
	rarity: "legendary",
	type: "weapon",
	weaponType: "bow",
	handedness: "twoHanded",
	attackRange: "ranged",
	damage: {
		dice: "1d8+4",
		type: "piercing",
		damageClass: "physical",
		attribute: "dexterity",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
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
	],
	tags: [],
});
