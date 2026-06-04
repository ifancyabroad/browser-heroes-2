import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_warlock",
	name: "Orc Warlock",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-mYiqLTBYHHTIpxuO?alt=media&token=30a31701-e47a-4b63-a934-08850c3cb20a",
	boss: false,
	challenge: 15,
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
	skills: ["attack", "shadow_bolt", "fireball", "iron_skin", "embrace_shadows"],
	stats: {
		charisma: 10,
		constitution: 16,
		dexterity: 12,
		intelligence: 18,
		strength: 14,
		wisdom: 14,
	},
	tactics: "caster",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-Nm2HibRx3V8P1isPlRf",
		hand1: "-Nc46CPWJz2atC_uII9i",
	},
});
