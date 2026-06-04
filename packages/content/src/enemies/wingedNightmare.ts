import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "winged_nightmare",
	name: "Winged Nightmare",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4ktfHDKaMkQPE_pHx?alt=media&token=5fcad994-cc82-4111-b9b4-57009dd40514",
	boss: false,
	challenge: 19,
	zone: "abyss",
	resistances: {
		acid: 25,
		cold: 25,
		crushing: 25,
		fire: 25,
		lightning: 25,
		necrotic: 0,
		piercing: 25,
		poison: 25,
		radiant: 0,
		slashing: 25,
	},
	skills: ["attack", "wind_strike", "evasion", "drop_from_above"],
	stats: {
		charisma: 12,
		constitution: 18,
		dexterity: 22,
		intelligence: 10,
		strength: 18,
		wisdom: 14,
	},
	tactics: "default",
	naturalArmourClass: 18,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		hand1: "-NgK0n7aPw0NHeefOnRg",
	},
});
