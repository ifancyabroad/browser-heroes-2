import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "basilisk",
	name: "Basilisk",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTPWvUSrJHK-FcH_R1?alt=media&token=922dafba-7a03-44fe-99c6-68631296b765",
	boss: false,
	challenge: 11,
	zone: "volcano",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: 0,
		fire: 50,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 0,
		radiant: 0,
		slashing: 0,
	},
	skills: ["attack", "petrifying_gaze", "leap_attack", "toxic_bite"],
	stats: {
		charisma: 3,
		constitution: 11,
		dexterity: 13,
		intelligence: 2,
		strength: 12,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 11,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "piercing",
});
