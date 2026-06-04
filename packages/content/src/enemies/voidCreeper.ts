import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "void_creeper",
	name: "Void Creeper",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dNPoAEQhZpCpSnOye?alt=media&token=3aef2883-32c4-48ac-9eeb-b27138ccb665",
	boss: false,
	challenge: 17,
	zone: "ocean",
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
	skills: ["attack", "cone_of_cold", "drain_life", "psionic_blast"],
	stats: {
		charisma: 13,
		constitution: 16,
		dexterity: 14,
		intelligence: 20,
		strength: 9,
		wisdom: 18,
	},
	tactics: "caster",
	naturalArmourClass: 16,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
});
