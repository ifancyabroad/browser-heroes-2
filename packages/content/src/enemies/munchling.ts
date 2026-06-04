import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "munchling",
	name: "Munchling",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dLuxaOA1hXh3U7Mnv?alt=media&token=96b4d19f-9b3b-47ca-8f58-a654fea15e5f",
	boss: false,
	challenge: 11,
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
	skills: ["attack", "go_for_the_eyes", "cold_bite"],
	stats: {
		charisma: 6,
		constitution: 14,
		dexterity: 17,
		intelligence: 6,
		strength: 14,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "piercing",
});
