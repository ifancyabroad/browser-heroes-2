import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "flame_shrieker",
	name: "Flame Shrieker",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O1g2suyagydsOiCLMPZ?alt=media&token=2220862d-2939-4c71-a1b7-c0c9635fabfd",
	boss: false,
	challenge: 14,
	zone: "volcano",
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
	skills: ["attack", "burning_rampage", "deafening_screech", "leap_attack"],
	stats: {
		charisma: 10,
		constitution: 14,
		dexterity: 16,
		intelligence: 3,
		strength: 18,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 14,
	naturalMinDamage: 1,
	naturalMaxDamage: 8,
	naturalDamageType: "piercing",
});
