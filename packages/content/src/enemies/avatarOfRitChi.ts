import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "avatar_of_rit_chi",
	name: "Avatar of Rit Chi",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_Zt9uUjy8pye9AGEZ?alt=media&token=a14ca262-c02b-4ed2-8e47-ba9591710189",
	boss: true,
	challenge: 18,
	zone: "desert",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: -50,
		fire: 0,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 100,
		radiant: 0,
		slashing: 0,
	},
	skills: ["attack", "double_strike", "drain_energy", "call_upon_rit_chi"],
	stats: {
		charisma: 6,
		constitution: 20,
		dexterity: 16,
		intelligence: 4,
		strength: 19,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 15,
	naturalMinDamage: 6,
	naturalMaxDamage: 12,
	naturalDamageType: "slashing",
});
