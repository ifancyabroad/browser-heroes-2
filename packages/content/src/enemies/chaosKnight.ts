import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "chaos_knight",
	name: "Chaos Knight",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC8tNczeWUPU9bCX5o4?alt=media&token=49c6b657-5da0-4639-931b-12b9dd50d725",
	boss: false,
	challenge: 17,
	zone: "dungeon",
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
	skills: ["attack", "disarm", "focus_energy", "whirlwind_strike"],
	stats: {
		charisma: 14,
		constitution: 20,
		dexterity: 18,
		intelligence: 10,
		strength: 20,
		wisdom: 14,
	},
	tactics: "default",
	naturalArmourClass: 18,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-NgJxsDuymhUWq2V4ew8",
		hand1: "-NgK0n7aPw0NHeefOnRg",
		head: "-NgJyJCDG-1UEccRymvT",
	},
});
