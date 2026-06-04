import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "greyhorn_the_caged",
	name: "Greyhorn the Caged",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTpSKiIRPOLlAMwvOl?alt=media&token=5d394a14-cf9a-4dc5-8469-c095a7701a74",
	boss: true,
	challenge: 14,
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
	skills: ["attack", "cleave", "minotaur_charge", "frenzy"],
	stats: {
		charisma: 9,
		constitution: 16,
		dexterity: 11,
		intelligence: 6,
		strength: 18,
		wisdom: 16,
	},
	tactics: "default",
	naturalArmourClass: 11,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "crushing",
	equipment: {
		body: "-NMEwPxI9DXom0AaME0Z",
		hand1: "-NgO1-16PWvnT302EIO_",
	},
});
