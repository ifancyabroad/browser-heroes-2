import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "dunzarak_the_deceived",
	name: "Dunzarak the Deceived",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4s3cRf4Z7obD_VqTQ?alt=media&token=f96721a3-ca4e-40a7-b67c-7039a7f1cee9",
	boss: true,
	challenge: 24,
	zone: "abyss",
	resistances: {
		acid: 50,
		cold: 50,
		crushing: 50,
		fire: 50,
		lightning: 50,
		necrotic: 0,
		piercing: 50,
		poison: 50,
		radiant: 0,
		slashing: 50,
	},
	skills: [
		"attack",
		"fire_breath",
		"tail_swipe",
		"double_strike",
		"summon_storm",
		"dragon_focus",
	],
	stats: {
		charisma: 24,
		constitution: 25,
		dexterity: 14,
		intelligence: 16,
		strength: 27,
		wisdom: 15,
	},
	tactics: "default",
	naturalArmourClass: 22,
	naturalMinDamage: 10,
	naturalMaxDamage: 16,
	naturalDamageType: "piercing",
});
