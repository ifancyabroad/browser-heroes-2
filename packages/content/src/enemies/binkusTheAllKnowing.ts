import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "binkus_the_all_knowing",
	name: "Binkus the All Knowing",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC8tx6bQo9WPm4r_qrW?alt=media&token=dd7d49ee-c291-4f2f-a4b0-ea21397b3b1c",
	boss: true,
	challenge: 25,
	zone: "dungeon",
	resistances: {
		acid: 25,
		cold: 25,
		crushing: 25,
		fire: 25,
		lightning: 25,
		necrotic: 0,
		piercing: 25,
		poison: 25,
		radiant: 0,
		slashing: 25,
	},
	skills: [
		"attack",
		"finger_of_death",
		"globe_of_invulnerability",
		"chain_lightning",
		"dragon_breath",
		"pierce_magic",
		"binkus_deathray",
	],
	stats: {
		charisma: 16,
		constitution: 16,
		dexterity: 14,
		intelligence: 24,
		strength: 8,
		wisdom: 18,
	},
	tactics: "caster",
	naturalArmourClass: 21,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-O8IE8osJo-rek1NyPIc",
		hand1: "-O8826bklHQ7fH__Egi2",
	},
});
