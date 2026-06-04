import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "drakus_the_awakened",
	name: "Drakus the Awakened",
	description: "A dragon.",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NNvOKycvGLGjgkXhAwj?alt=media&token=c2519452-b55a-4e83-8e7f-cc06ec866d16",
	boss: true,
	challenge: 23,
	zone: "volcano",
	resistances: {
		acid: 50,
		cold: 50,
		crushing: 50,
		fire: 50,
		lightning: 50,
		necrotic: 0,
		piercing: 50,
		poison: 50,
		radiant: 0,
		slashing: 50,
	},
	skills: ["attack", "deafening_roar", "fire_breath", "dragon_focus", "multi_strike"],
	stats: {
		charisma: 21,
		constitution: 25,
		dexterity: 10,
		intelligence: 16,
		strength: 27,
		wisdom: 13,
	},
	tactics: "default",
	naturalArmourClass: 22,
	naturalMinDamage: 6,
	naturalMaxDamage: 12,
	naturalDamageType: "piercing",
});
