import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "hydra_of_the_deep",
	name: "Hydra of the Deep",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dX2YZzneMSoTiBmYu?alt=media&token=16286262-5f50-4b25-ae8d-9eaefaa136f1",
	boss: true,
	challenge: 21,
	zone: "ocean",
	resistances: {
		acid: 0,
		cold: 50,
		crushing: 0,
		fire: 0,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 50,
		radiant: 0,
		slashing: 0,
	},
	skills: ["attack", "frost_breath", "deafening_roar", "dragon_focus", "multi_strike"],
	stats: {
		charisma: 14,
		constitution: 24,
		dexterity: 10,
		intelligence: 10,
		strength: 24,
		wisdom: 13,
	},
	tactics: "default",
	naturalArmourClass: 18,
	naturalMinDamage: 6,
	naturalMaxDamage: 12,
	naturalDamageType: "piercing",
});
