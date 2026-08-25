import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "staff_of_the_archmage",
	name: "Staff of the Archmage",
	description:
		"The Staff of the Archmage is an ornate rod made from dark wood, crowned with a radiant crystal that glimmers with arcane energy. It enhances spellcasting abilities, allowing the wielder to manipulate powerful spells with ease. This staff is a symbol of mastery, favored by the most powerful mages.",
	icon: "items/weapons/staves/staff_49.png",
	price: 4200,
	rarity: "legendary",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	attackRange: "melee",
	damage: {
		dice: "1d8+4",
		type: "cold",
		damageClass: "magical",
		attribute: "intelligence",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageClass: "magical",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 4,
		},
	],
	attackRiders: [],
	tags: [],
});
