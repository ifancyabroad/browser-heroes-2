import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_soldier",
	name: "Orc Soldier",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-lBa51MudTHTCLF5t?alt=media&token=85410942-b208-4a70-91d1-e00dd54e15cc",
	boss: false,
	challenge: 13,
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
	skills: ["attack", "heavy_strike", "rend", "armour_break"],
	stats: {
		charisma: 10,
		constitution: 16,
		dexterity: 14,
		intelligence: 7,
		strength: 18,
		wisdom: 11,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		hand1: "-NgK-VVeMfZnyRzNuNyK",
		hand2: "-NzEciDFUuzY6cG9UEia",
	},
});
