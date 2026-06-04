import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "squib",
	name: "Squib",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dIirSbCPjrRRGen8U?alt=media&token=916c42e0-7972-46a7-b065-8a1bd5ec88b8",
	boss: false,
	challenge: 7,
	zone: "ocean",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: 0,
		fire: 0,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 0,
		radiant: 0,
		slashing: 0,
	},
	skills: ["attack", "doom_song"],
	stats: {
		charisma: 8,
		constitution: 11,
		dexterity: 10,
		intelligence: 11,
		strength: 13,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 11,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		hand1: "-Nc46CPWJz2atC_uII9i",
	},
});
