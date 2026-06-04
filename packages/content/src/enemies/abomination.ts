import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "abomination",
	name: "Abomination",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NKt3ujmy2tXghwqSM9o?alt=media&token=523b97cb-dd08-4c3c-a1dd-e44f82e0fc54",
	boss: false,
	challenge: 15,
	zone: "hills",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: 0,
		fire: 0,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 100,
		radiant: -50,
		slashing: 0,
	},
	skills: ["attack", "double_strike", "corrupted_arm", "skull_bash"],
	stats: {
		charisma: 5,
		constitution: 18,
		dexterity: 10,
		intelligence: 3,
		strength: 20,
		wisdom: 6,
	},
	tactics: "default",
	naturalArmourClass: 14,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "crushing",
});
