import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "vilespawn",
	name: "Vilespawn",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC8t-vypjdsgapZvwLp?alt=media&token=8c989f52-8ee5-4001-b092-043015e7448a",
	boss: false,
	challenge: 15,
	zone: "dungeon",
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
	skills: ["attack", "leap_attack", "overpower", "toxic_bite"],
	stats: {
		charisma: 7,
		constitution: 16,
		dexterity: 14,
		intelligence: 6,
		strength: 18,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 15,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "piercing",
});
