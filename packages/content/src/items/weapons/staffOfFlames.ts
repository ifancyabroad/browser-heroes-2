import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "staff_of_flames",
	name: "Staff of Flames",
	description:
		"The Staff of Flames is a fiery red rod intricately carved with flame motifs and topped with a glowing ember. This staff channels intense fire magic, enabling the wielder to unleash powerful fire spells. Favored by fire mages, it embodies the raw energy and destructive potential of flames.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O883ldvSyYlUMXKPTKl?alt=media&token=212e10f0-d163-4da5-9d36-1b3d5ecd597e",
	price: 640,
	rarity: "common",
	type: "weapon",
	weaponType: "staff",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d8+2",
		type: "crushing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
