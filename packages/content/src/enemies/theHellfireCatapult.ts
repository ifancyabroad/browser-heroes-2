import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_hellfire_catapult",
	name: "The Hellfire Catapult",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_bEIXK4OQRQ8b5pzp?alt=media&token=ea071f73-d09d-4c29-97ab-951f39a9a806",
	boss: true,
	challenge: 17,
	zone: "desert",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: 0,
		fire: -50,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 100,
		radiant: 0,
		slashing: 0,
	},
	skills: ["attack", "disease_shot", "make_it_rain", "reposition"],
	stats: {
		charisma: 5,
		constitution: 18,
		dexterity: 14,
		intelligence: 10,
		strength: 20,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 16,
	naturalMinDamage: 7,
	naturalMaxDamage: 14,
	naturalDamageType: "crushing",
});
