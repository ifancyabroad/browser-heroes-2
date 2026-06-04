import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Staff of the Archmage is an ornate rod made from dark wood, crowned with a radiant crystal that glimmers with arcane energy. It enhances spellcasting abilities, allowing the wielder to manipulate powerful spells with ease. This staff is a symbol of mastery, favored by the most powerful mages.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O8826bklHQ7fH__Egi2?alt=media&token=7b07954d-b9f1-4ebb-bd6c-ba7f6f735e5a",
	level: 4,
	max: 11,
	min: 4,
	name: "Staff of the Archmage",
	price: 1800,
	properties: [
		{
			name: "cold",
			type: "damage",
			value: 40,
		},
		{
			name: "fire",
			type: "damage",
			value: 40,
		},
		{
			name: "lightning",
			type: "damage",
			value: 40,
		},
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "staff",
	id: "staff_of_the_archmage",
});
