import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "staff_of_the_archmage",
	name: "Staff of the Archmage",
	description:
		"The Staff of the Archmage is an ornate rod made from dark wood, crowned with a radiant crystal that glimmers with arcane energy. It enhances spellcasting abilities, allowing the wielder to manipulate powerful spells with ease. This staff is a symbol of mastery, favored by the most powerful mages.",
	icon: "items/weapons/staves/staff_49.png",
	price: 1800,
	rarity: "legendary",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+3",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
