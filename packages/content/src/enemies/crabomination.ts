import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "crabomination",
	name: "Crabomination",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dO9Hor_-bf7V_xgzs?alt=media&token=db1ccc0d-5411-4124-af9b-9af25e3f4cfc",
	boss: false,
	challenge: 17,
	zone: "ocean",
	resistances: {
		acid: 0,
		cold: 50,
		crushing: 0,
		fire: 0,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 0,
		radiant: 0,
		slashing: 0,
	},
	skills: ["attack", "crab_hammer", "powerful_blow", "skull_bash"],
	stats: {
		charisma: 6,
		constitution: 22,
		dexterity: 10,
		intelligence: 6,
		strength: 20,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 18,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "crushing",
});
