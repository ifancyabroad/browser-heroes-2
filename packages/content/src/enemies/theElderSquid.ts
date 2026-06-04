import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_elder_squid",
	name: "The Elder Squid",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dSO4fdChwx6OrOCx5?alt=media&token=6fda1fb4-5d7e-4f7a-b4e0-f4678f13a835",
	boss: true,
	challenge: 22,
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
	skills: [
		"attack",
		"globe_of_invulnerability",
		"drain_energy",
		"tentacle_wrap",
		"psionic_blast",
		"drain_life",
	],
	stats: {
		charisma: 18,
		constitution: 18,
		dexterity: 15,
		intelligence: 25,
		strength: 18,
		wisdom: 22,
	},
	tactics: "default",
	naturalArmourClass: 17,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "crushing",
});
