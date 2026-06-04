import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "fire_snake",
	name: "Fire Snake",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgYk1uHzdomGArMmxVa?alt=media&token=d0825833-28ae-4445-8dcb-a31f457517a1",
	boss: false,
	challenge: 13,
	zone: "volcano",
	resistances: {
		acid: 0,
		cold: -50,
		crushing: 0,
		fire: 50,
		lightning: 50,
		necrotic: 0,
		piercing: 0,
		poison: 0,
		radiant: 0,
		slashing: 0,
	},
	skills: ["attack", "constrict", "flame_bite"],
	stats: {
		charisma: 3,
		constitution: 12,
		dexterity: 14,
		intelligence: 1,
		strength: 19,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 14,
	naturalMinDamage: 1,
	naturalMaxDamage: 8,
	naturalDamageType: "piercing",
});
