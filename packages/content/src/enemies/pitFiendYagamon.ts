import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "pit_fiend_yagamon",
	name: "Pit Fiend Yagamon",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O1g5UbnObhA-7IMjEhj?alt=media&token=607165fd-970a-42c7-909c-0c366825351e",
	boss: true,
	challenge: 22,
	zone: "volcano",
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
	skills: ["attack", "double_strike", "fireball", "fire_strike", "yagamon_s_revenge"],
	stats: {
		charisma: 24,
		constitution: 24,
		dexterity: 14,
		intelligence: 22,
		strength: 26,
		wisdom: 18,
	},
	tactics: "default",
	naturalArmourClass: 20,
	naturalMinDamage: 6,
	naturalMaxDamage: 12,
	naturalDamageType: "crushing",
});
