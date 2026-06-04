import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "radiant",
	description:
		"The Holy Wand is a slender, elegantly carved rod, often adorned with symbols of light and protection. Infused with divine energy, it allows the wielder to cast healing spells and ward off evil. This wand is favored by clerics and paladins, embodying hope and righteousness in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O888JJX3_O4U2wBZ78X?alt=media&token=a508f5a9-b4d2-48c2-ac08-2c996323ee7f",
	level: 3,
	max: 6,
	min: 3,
	name: "Holy Wand",
	price: 600,
	properties: [
		{
			name: "wisdom",
			type: "stat",
			value: 2,
		},
		{
			name: "radiant",
			type: "damage",
			value: 20,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "wand",
	id: "holy_wand",
});
