import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "damp_high_priestess",
	name: "Damp High Priestess",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dQ6Mfco5z_8Yt4o-t?alt=media&token=37e454c3-4137-43e9-b96a-ebffe5d12d31",
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
	skills: ["attack", "power_word_fortitude", "cure_major_wounds", "flamestrike", "holy_bolt"],
	stats: {
		charisma: 14,
		constitution: 17,
		dexterity: 14,
		intelligence: 16,
		strength: 11,
		wisdom: 18,
	},
	tactics: "default",
	naturalArmourClass: 15,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		hand1: "-NgO2xYEe4Kzg3ST0JW2",
	},
});
