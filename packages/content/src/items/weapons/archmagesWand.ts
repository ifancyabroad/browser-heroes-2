import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "archmages_wand",
	name: "Archmage's Wand",
	description:
		"The Archmage's Wand is a finely crafted, elegantly carved rod imbued with immense magical power. Adorned with shimmering gemstones, it enhances spellcasting abilities, allowing for the manipulation of potent spells. This wand is a symbol of mastery, favored by the most skilled and learned mages.",
	icon: "items/weapons/wands/Wand_v2_74.png",
	price: 3200,
	rarity: "legendary",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	attackRange: "ranged",
	damage: {
		dice: "1d4+4",
		type: "lightning",
		damageClass: "magical",
		attribute: "intelligence",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 4,
		},
	],
	attackRiders: [],
	tags: [],
});
