import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "flame_shot",
	name: "Flame Shot",
	description:
		"Flame Shot is a beautifully crafted bow with fiery engravings along its limbs. When drawn, it ignites arrows in a blaze of fire, unleashing scorching shots that can engulf targets in flames. Favored by skilled archers, this bow is perfect for delivering both precision and destruction.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O837_TaJ6HTFBsgNpzS?alt=media&token=9c2ed3c7-e15d-46d0-a7e0-6bf2a5e37712",
	price: 1280,
	rarity: "common",
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
					damageType: "fire",
					dice: "1d8+3",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
