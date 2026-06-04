import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "cyclops",
	name: "Cyclops",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4XNLlQk-tb-D9BMAJ?alt=media&token=e1e9e459-1a43-4c74-8c41-57c817289468",
	boss: false,
	challenge: 16,
	zone: "abyss",
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
	skills: ["attack", "tenderise", "double_strike"],
	stats: {
		charisma: 10,
		constitution: 20,
		dexterity: 11,
		intelligence: 8,
		strength: 22,
		wisdom: 6,
	},
	tactics: "default",
	naturalArmourClass: 14,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "crushing",
	equipment: {
		hand1: "-NgO1-16PWvnT302EIO_",
	},
});
