import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "brute",
	name: "Brute",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-InhmXpZQgctzSV16?alt=media&token=38e5cadb-8e81-4c12-ac79-2d46f5a4ea7e",
	boss: false,
	challenge: 12,
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
	skills: ["attack", "stand_ground", "focus_energy"],
	stats: {
		charisma: 10,
		constitution: 16,
		dexterity: 14,
		intelligence: 10,
		strength: 14,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 10,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-NMEwPxI9DXom0AaME0Z",
		hand1: "-O86LrSuGHIRtQuAJJAq",
		hand2: "-NZMqz87pcH6a1OgycJ9",
		head: "-NgJyJCDG-1UEccRymvT",
	},
});
