import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_warlock",
	name: "Ratman Warlock",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_YM1vo2Mdr-Q-wHc3?alt=media&token=ff71c971-06c5-44ea-a248-d741781dc108",
	boss: false,
	challenge: 13,
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
	skills: ["attack", "embrace_shadows", "flame_arrow", "shadow_bolt", "blind"],
	stats: {
		charisma: 12,
		constitution: 14,
		dexterity: 16,
		intelligence: 18,
		strength: 10,
		wisdom: 16,
	},
	tactics: "caster",
	naturalArmourClass: 12,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "slashing",
	equipment: {
		body: "-NgO5fUaNmJH7LpPo2LP",
		hand1: "-Nc46CPWJz2atC_uII9i",
	},
});
