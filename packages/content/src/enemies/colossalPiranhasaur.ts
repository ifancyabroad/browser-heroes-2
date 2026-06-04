import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "colossal_piranhasaur",
	name: "Colossal Piranhasaur",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dU8gwThi8fYltU0PV?alt=media&token=4a2a8b62-d2a5-4acc-8b5c-674d2f1c9fca",
	boss: false,
	challenge: 16,
	zone: "ocean",
	resistances: {
		acid: 0,
		cold: 50,
		crushing: 0,
		fire: 0,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 0,
		radiant: 0,
		slashing: 0,
	},
	skills: ["attack", "knock_down", "double_strike", "powerful_blow"],
	stats: {
		charisma: 6,
		constitution: 20,
		dexterity: 10,
		intelligence: 6,
		strength: 22,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 16,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "crushing",
});
