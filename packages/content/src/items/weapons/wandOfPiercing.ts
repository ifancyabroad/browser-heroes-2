import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "fire",
	description:
		"The Wand of Piercing is a sleek, metallic wand designed for precision and power. It enhances spellcasters' piercing spells, allowing them to bypass defenses and strike directly at their targets. Favored by skilled mages, this wand is an essential tool for delivering powerful, targeted attacks.",
	effects: [
		{
			difficulty: 19,
			duration: 4,
			modifier: "intelligence",
			properties: [
				{
					name: "fire",
					type: "resistance",
					value: -25,
				},
				{
					name: "lightning",
					type: "resistance",
					value: -25,
				},
				{
					name: "cold",
					type: "resistance",
					value: -25,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O889_GejsGHdcZH4_ek?alt=media&token=f8aba8fd-15c2-45fa-b5a7-8244d091e2fe",
	level: 3,
	max: 6,
	min: 3,
	name: "Wand of Piercing",
	price: 580,
	size: "oneHanded",
	type: "weapon",
	weaponType: "wand",
	id: "wand_of_piercing",
});
