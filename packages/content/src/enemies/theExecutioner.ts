import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_executioner",
	name: "The Executioner",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkVOZVy5W_2PPD1vjr?alt=media&token=89a6ef6d-e141-4b2c-b6cf-f5fe2f0ae051",
	boss: true,
	challenge: 19,
	zone: "hills",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: -50,
		fire: 0,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 100,
		radiant: -50,
		slashing: 0,
	},
	skills: ["attack", "knock_down", "execute", "powerful_blow"],
	stats: {
		charisma: 8,
		constitution: 18,
		dexterity: 10,
		intelligence: 6,
		strength: 22,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 16,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		hand1: "-NgO1-16PWvnT302EIO_",
	},
});
