import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "worg",
	name: "Worg",
	description: "A wolf like creatue.",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NZMCIuuab0gVQ5bMj6j?alt=media&token=79233684-7c04-4e93-8ecb-d2c46fa45b07",
	boss: false,
	challenge: 7,
	zone: "forest",
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
	skills: ["attack"],
	stats: {
		charisma: 8,
		constitution: 11,
		dexterity: 11,
		intelligence: 7,
		strength: 14,
		wisdom: 11,
	},
	tactics: "default",
	naturalArmourClass: 8,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "piercing",
});
