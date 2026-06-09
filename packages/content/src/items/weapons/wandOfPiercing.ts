import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "wand_of_piercing",
	name: "Wand of Piercing",
	description:
		"The Wand of Piercing is a sleek, metallic wand designed for precision and power. It enhances spellcasters' piercing spells, allowing them to bypass defenses and strike directly at their targets. Favored by skilled mages, this wand is an essential tool for delivering powerful, targeted attacks.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O889_GejsGHdcZH4_ek?alt=media&token=f8aba8fd-15c2-45fa-b5a7-8244d091e2fe",
	price: 580,
	rarity: "common",
	type: "weapon",
	weaponType: "wand",
	handedness: "oneHanded",
	range: "ranged",
	damage: {
		dice: "1d4+2",
		type: "fire",
		attribute: "intelligence",
	},
	modifiers: [],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "intelligence",
				dc: {
					base: 19,
					attribute: "intelligence",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "vulnerable",
					durationTurns: 4,
				},
			],
		},
	],
	tags: [],
});
