import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "assassin_of_rit_chi",
	name: "Assassin of Rit Chi",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_R3NOnT3i1DLiEKnd?alt=media&token=f15f0ecf-a296-4c06-a5db-5035e7701b32",
	boss: false,
	challenge: 15,
	zone: "desert",
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
	skills: ["attack", "acrobatic_strike", "evasion", "backstab"],
	stats: {
		charisma: 6,
		constitution: 14,
		dexterity: 18,
		intelligence: 10,
		strength: 12,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 12,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "slashing",
	equipment: {
		body: "-Nm2AhkGYoZ3Qw0JaJfd",
		hand1: "-NNwMy0q-XKUT-EUvxFF",
		hand2: "-NNwMy0q-XKUT-EUvxFF",
	},
});
