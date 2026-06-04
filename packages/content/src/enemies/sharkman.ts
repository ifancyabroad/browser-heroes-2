import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "sharkman",
	name: "Sharkman",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dMUJn3WZ9o8aQlNnb?alt=media&token=f60c8ec6-02cc-4617-bff1-cdc8f210dd83",
	boss: false,
	challenge: 13,
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
	skills: ["attack", "charge", "detect_blood", "cold_bite", "rend"],
	stats: {
		charisma: 6,
		constitution: 16,
		dexterity: 15,
		intelligence: 6,
		strength: 16,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 8,
	naturalDamageType: "piercing",
});
