import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "lightning",
	description:
		"The Archmage's Wand is a finely crafted, elegantly carved rod imbued with immense magical power. Adorned with shimmering gemstones, it enhances spellcasting abilities, allowing for the manipulation of potent spells. This wand is a symbol of mastery, favored by the most skilled and learned mages.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O88A4_A04Uf9jAxmv0B?alt=media&token=ff802545-0918-4034-ab58-3562525309eb",
	level: 4,
	max: 7,
	min: 4,
	name: "Archmage's Wand",
	price: 1650,
	properties: [
		{
			name: "fire",
			type: "damage",
			value: 20,
		},
		{
			name: "cold",
			type: "damage",
			value: 20,
		},
		{
			name: "lightning",
			type: "damage",
			value: 20,
		},
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "wand",
	id: "archmages_wand",
});
