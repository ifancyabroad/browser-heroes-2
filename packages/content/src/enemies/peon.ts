import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "peon",
	name: "Peon",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-fMuqrOuFGLmOM7kj?alt=media&token=0020019a-77c4-43ea-bf02-350d5abcdb86",
	boss: false,
	challenge: 10,
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
	skills: ["attack", "heavy_strike"],
	stats: {
		charisma: 10,
		constitution: 16,
		dexterity: 12,
		intelligence: 7,
		strength: 16,
		wisdom: 11,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		hand1: "-NNwPg099VI_pDe9E_Zd",
	},
});
