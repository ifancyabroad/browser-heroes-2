import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_slave",
	name: "Ratman Slave",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_O3wKJO9Pu6brBV24?alt=media&token=fd08e60c-fa58-4942-805a-a14d5ad55a28",
	boss: false,
	challenge: 6,
	zone: "desert",
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
	skills: ["attack", "poison_bomb"],
	stats: {
		charisma: 6,
		constitution: 8,
		dexterity: 14,
		intelligence: 6,
		strength: 8,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 12,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "slashing",
});
