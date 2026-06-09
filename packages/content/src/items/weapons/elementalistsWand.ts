import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "elementalists_wand",
	name: "Elementalist's Wand",
	description:
		"The Elementalist's Wand is a beautifully crafted rod adorned with symbols of fire, water, earth, and air. This wand allows the wielder to channel elemental magic, casting powerful spells of all four elements. Favored by versatile mages, it embodies the balance of nature’s forces in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O888xxIucji-VaJ0gco?alt=media&token=6edaae9a-7dc8-440e-9c0c-859f2ee84de9",
	price: 1060,
	rarity: "common",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4+3",
		type: "cold",
		attribute: "intelligence",
	},
	modifiers: [],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "1d4+3",
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
					dice: "1d4+3",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
