import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "necrotic",
	description:
		"The Wand of Cursing is a slender, dark wand etched with sinister symbols that pulse with ominous energy. When wielded, it can unleash debilitating hexes and curses on foes, sowing chaos and confusion. Favored by dark sorcerers, this wand is a potent tool for those who wield malevolent magic.",
	effects: [
		{
			difficulty: 15,
			duration: 2,
			modifier: "intelligence",
			properties: [
				{
					name: "hitChance",
					type: "auxiliaryStat",
					value: -4,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O887GHDvG1vgr5D7Z1R?alt=media&token=94784288-a258-4e21-bbde-2d594e54923c",
	level: 3,
	max: 6,
	min: 3,
	name: "Wand of Cursing",
	price: 550,
	properties: [
		{
			name: "necrotic",
			type: "damage",
			value: 20,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "wand",
	id: "wand_of_cursing",
});
