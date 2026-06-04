import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wretch",
	name: "Wretch",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC8uEK4XtBh_Py9ba4-?alt=media&token=07baeee7-7023-4e42-ac14-627dd5139d2e",
	boss: false,
	challenge: 10,
	zone: "dungeon",
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
	skills: ["attack", "evasion", "leap_attack"],
	stats: {
		charisma: 6,
		constitution: 12,
		dexterity: 16,
		intelligence: 6,
		strength: 12,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 14,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "slashing",
});
