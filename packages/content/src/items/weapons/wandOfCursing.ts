import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "wand_of_cursing",
	name: "Wand of Cursing",
	description:
		"The Wand of Cursing is a slender, dark wand etched with sinister symbols that pulse with ominous energy. When wielded, it can unleash debilitating hexes and curses on foes, sowing chaos and confusion. Favored by dark sorcerers, this wand is a potent tool for those who wield malevolent magic.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O887GHDvG1vgr5D7Z1R?alt=media&token=94784288-a258-4e21-bbde-2d594e54923c",
	price: 550,
	rarity: "rare",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4+2",
		type: "necrotic",
		attribute: "intelligence",
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 20,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "intelligence",
				dc: {
					base: 15,
					attribute: "intelligence",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "attackRollBonus",
					operation: "add",
					value: -4,
					durationTurns: 2,
				},
			],
		},
	],
	tags: [],
});
