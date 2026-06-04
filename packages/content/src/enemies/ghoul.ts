import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ghoul",
	name: "Ghoul",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgT_UhmZUanGpfiYwvB?alt=media&token=1382fd96-b9af-43da-ba47-cf0bfc802347",
	boss: false,
	challenge: 11,
	zone: "hills",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: 0,
		fire: 0,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 100,
		radiant: -50,
		slashing: 0,
	},
	skills: ["attack", "ghoul_strike"],
	stats: {
		charisma: 6,
		constitution: 10,
		dexterity: 15,
		intelligence: 7,
		strength: 13,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 12,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "crushing",
});
