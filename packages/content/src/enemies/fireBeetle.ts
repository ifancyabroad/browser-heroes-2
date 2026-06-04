import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "fire_beetle",
	name: "Fire Beetle",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTnsfQ_nzEzn_ochM3?alt=media&token=fd6e145d-18ef-4869-88b7-d35fd0d9d1bb",
	boss: false,
	challenge: 12,
	zone: "volcano",
	resistances: {
		acid: 0,
		cold: -50,
		crushing: 0,
		fire: 50,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 0,
		radiant: 0,
		slashing: 0,
	},
	skills: ["attack", "combust"],
	stats: {
		charisma: 3,
		constitution: 12,
		dexterity: 10,
		intelligence: 1,
		strength: 8,
		wisdom: 7,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "piercing",
});
