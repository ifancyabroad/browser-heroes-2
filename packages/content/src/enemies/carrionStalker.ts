import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "carrion_stalker",
	name: "Carrion Stalker",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4Oe8U0xBhi76jwF3P?alt=media&token=98d5fb0b-49e6-4a89-9f1c-0d9936b2728e",
	boss: false,
	challenge: 13,
	zone: "abyss",
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
	skills: ["attack", "detect_blood", "leap_attack"],
	stats: {
		charisma: 7,
		constitution: 14,
		dexterity: 16,
		intelligence: 5,
		strength: 14,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "piercing",
});
