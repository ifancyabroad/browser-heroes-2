import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "giant_yeti",
	name: "Giant Yeti",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC8tbRx4aU1NA7LfKlE?alt=media&token=0b801580-197c-4c4d-b3ca-62a10fe6d8d2",
	boss: false,
	challenge: 19,
	zone: "dungeon",
	resistances: {
		acid: 25,
		cold: 50,
		crushing: 25,
		fire: -50,
		lightning: 25,
		necrotic: 0,
		piercing: 25,
		poison: 25,
		radiant: 0,
		slashing: 25,
	},
	skills: ["attack", "double_strike", "deafening_roar", "tenderise"],
	stats: {
		charisma: 10,
		constitution: 22,
		dexterity: 14,
		intelligence: 6,
		strength: 24,
		wisdom: 14,
	},
	tactics: "default",
	naturalArmourClass: 18,
	naturalMinDamage: 7,
	naturalMaxDamage: 14,
	naturalDamageType: "crushing",
});
