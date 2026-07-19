import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "staff_of_the_archmage",
	name: "Staff of the Archmage",
	description:
		"The Staff of the Archmage is an ornate rod made from dark wood, crowned with a radiant crystal that glimmers with arcane energy. It enhances spellcasting abilities, allowing the wielder to manipulate powerful spells with ease. This staff is a symbol of mastery, favored by the most powerful mages.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O8826bklHQ7fH__Egi2?alt=media&token=7b07954d-b9f1-4ebb-bd6c-ba7f6f735e5a",
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
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
