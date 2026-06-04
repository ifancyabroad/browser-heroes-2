import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "glompling",
	name: "Glompling",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkUQSsszVLO_4PrBQy?alt=media&token=1bfab329-0a88-42a0-99e2-c0fd7e915fed",
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
	skills: ["attack", "acid_bite"],
	stats: {
		charisma: 8,
		constitution: 9,
		dexterity: 14,
		intelligence: 8,
		strength: 7,
		wisdom: 7,
	},
	tactics: "default",
	naturalArmourClass: 7,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "piercing",
});
