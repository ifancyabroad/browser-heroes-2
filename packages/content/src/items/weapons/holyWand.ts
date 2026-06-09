import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "holy_wand",
	name: "Holy Wand",
	description:
		"The Holy Wand is a slender, elegantly carved rod, often adorned with symbols of light and protection. Infused with divine energy, it allows the wielder to cast healing spells and ward off evil. This wand is favored by clerics and paladins, embodying hope and righteousness in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O888JJX3_O4U2wBZ78X?alt=media&token=a508f5a9-b4d2-48c2-ac08-2c996323ee7f",
	price: 600,
	rarity: "common",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4+2",
		type: "radiant",
		attribute: "intelligence",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 20,
		},
	],
	attackRiders: [],
	tags: [],
});
