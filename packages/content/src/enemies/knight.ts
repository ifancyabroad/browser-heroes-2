import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "knight",
	name: "Knight",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-TgKSeZTRHhQWIyIs?alt=media&token=eb6eacf8-48c4-4f7f-8242-a737045ed309",
	boss: false,
	challenge: 13,
	zone: "castle",
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
	skills: ["attack", "stand_ground", "armour_break", "holy_strike"],
	stats: {
		charisma: 10,
		constitution: 14,
		dexterity: 14,
		intelligence: 10,
		strength: 16,
		wisdom: 14,
	},
	tactics: "default",
	naturalArmourClass: 10,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-Nm2Cd-d46R6iuL4782x",
		hand1: "-NMmvhpTgBUrely_XRJ7",
		hand2: "-NZMqz87pcH6a1OgycJ9",
		head: "-NgJyJCDG-1UEccRymvT",
	},
});
