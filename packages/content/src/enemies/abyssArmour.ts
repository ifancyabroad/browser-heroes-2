import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "abyss_armour",
	name: "Abyss Armour",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4_cpdJr5yvR4b9FM4?alt=media&token=73d7fb9b-114e-4373-b327-6e8c0dfa74d9",
	boss: false,
	challenge: 16,
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
	skills: ["attack", "armour_break", "disarm", "wind_strike"],
	stats: {
		charisma: 10,
		constitution: 18,
		dexterity: 10,
		intelligence: 10,
		strength: 18,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 18,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-NgJxsDuymhUWq2V4ew8",
		hand1: "-NgO0_TN42Pqrd5WQENu",
		hand2: "-NZMqz87pcH6a1OgycJ9",
	},
});
