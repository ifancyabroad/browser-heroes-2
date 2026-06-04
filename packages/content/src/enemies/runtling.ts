import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "runtling",
	name: "Runtling",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NKsyKI9WEI82s5dZFJ_?alt=media&token=45711dab-2627-4d69-9314-5ebe9d443818",
	boss: false,
	challenge: 4,
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
	skills: ["attack", "charge", "acid_bite"],
	stats: {
		charisma: 8,
		constitution: 9,
		dexterity: 13,
		intelligence: 10,
		strength: 8,
		wisdom: 8,
	},
	tactics: "default",
	naturalArmourClass: 7,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "piercing",
});
