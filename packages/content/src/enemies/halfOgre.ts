import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "half_ogre",
	name: "Half Ogre",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-j9uq1e7GXuE-jJOV?alt=media&token=f449bfa4-ef90-4f5e-a2e0-5f683a4f6ef9",
	boss: false,
	challenge: 13,
	zone: "plains",
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
	skills: ["attack", "battle_cry", "heavy_strike", "skull_bash"],
	stats: {
		charisma: 10,
		constitution: 16,
		dexterity: 12,
		intelligence: 8,
		strength: 19,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		hand1: "-NgToUYVTRc1av-QcBA2",
	},
});
