import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_wardog",
	name: "Orc Wardog",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-qmwsnK79o4q1bnpz?alt=media&token=02dfb855-a10f-4e34-b880-39ce3cded52b",
	boss: false,
	challenge: 16,
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
	skills: ["attack", "charge", "berserk", "leap_attack"],
	stats: {
		charisma: 10,
		constitution: 18,
		dexterity: 16,
		intelligence: 10,
		strength: 18,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-NgJxsDuymhUWq2V4ew8",
		hand1: "-NgO1IZu27jgUnBZOesh",
		hand2: "-NgJzNDx7O2sLwCLS8rd",
	},
});
