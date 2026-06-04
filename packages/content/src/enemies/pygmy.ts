import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "pygmy",
	name: "Pygmy",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTZVlj1jll9-HF8fPh?alt=media&token=b633df2e-a7a4-4a31-a60d-b2e81fb622e3",
	boss: false,
	challenge: 5,
	zone: "forest",
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
		charisma: 7,
		constitution: 10,
		dexterity: 11,
		intelligence: 6,
		strength: 13,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 6,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		hand1: "-NNwPg099VI_pDe9E_Zd",
	},
});
