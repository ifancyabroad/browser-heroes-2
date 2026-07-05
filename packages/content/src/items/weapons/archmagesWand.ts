import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "archmages_wand",
	name: "Archmage's Wand",
	description:
		"The Archmage's Wand is a finely crafted, elegantly carved rod imbued with immense magical power. Adorned with shimmering gemstones, it enhances spellcasting abilities, allowing for the manipulation of potent spells. This wand is a symbol of mastery, favored by the most skilled and learned mages.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O88A4_A04Uf9jAxmv0B?alt=media&token=ff802545-0918-4034-ab58-3562525309eb",
	price: 1650,
	rarity: "epic",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4+3",
		type: "lightning",
		attribute: "intelligence",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 20,
		},
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 20,
		},
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 20,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
