import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Staff of Flames is a fiery red rod intricately carved with flame motifs and topped with a glowing ember. This staff channels intense fire magic, enabling the wielder to unleash powerful fire spells. Favored by fire mages, it embodies the raw energy and destructive potential of flames.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O883ldvSyYlUMXKPTKl?alt=media&token=212e10f0-d163-4da5-9d36-1b3d5ecd597e",
	level: 3,
	max: 10,
	min: 3,
	name: "Staff of Flames",
	price: 640,
	properties: [
		{
			name: "fire",
			type: "damage",
			value: 40,
		},
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "staff",
	id: "staff_of_flames",
});
