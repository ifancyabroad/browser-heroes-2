import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_warchief_zog",
	name: "Orc Warchief Zog",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-xKrcqlLxbc3dyPP_?alt=media&token=d7ecd1dc-2a03-4bba-89c5-3d1c598e07ed",
	boss: true,
	challenge: 20,
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
	skills: ["attack", "berserk", "double_strike", "knock_down", "overpower"],
	stats: {
		charisma: 10,
		constitution: 18,
		dexterity: 16,
		intelligence: 12,
		strength: 20,
		wisdom: 14,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-NgJxsDuymhUWq2V4ew8",
		hand1: "-NgO1-16PWvnT302EIO_",
		head: "-NgJyJCDG-1UEccRymvT",
	},
});
