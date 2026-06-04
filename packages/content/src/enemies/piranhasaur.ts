import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "piranhasaur",
	name: "Piranhasaur",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dTVcQaMf3ZBV8IQ40?alt=media&token=ae9f6c63-2f57-4338-a164-c0ee72e356a3",
	boss: false,
	challenge: 12,
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
	skills: ["attack", "cold_bite", "detect_blood"],
	stats: {
		charisma: 5,
		constitution: 14,
		dexterity: 14,
		intelligence: 6,
		strength: 16,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "piercing",
});
