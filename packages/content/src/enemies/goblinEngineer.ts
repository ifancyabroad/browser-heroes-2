import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_engineer",
	name: "Goblin Engineer",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4PtHUmQIZX6B7gfXs?alt=media&token=e4fbcd11-2c14-4df7-a6e1-c2c65f497abf",
	boss: false,
	challenge: 12,
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
	skills: ["attack", "acid_bomb", "acid_trap", "poison_bomb"],
	stats: {
		charisma: 8,
		constitution: 10,
		dexterity: 14,
		intelligence: 10,
		strength: 8,
		wisdom: 8,
	},
	tactics: "default",
	naturalArmourClass: 12,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		hand1: "-NNwMy0q-XKUT-EUvxFF",
	},
});
