import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "lurker",
	name: "Lurker",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4d8dm_1E4j77WgLI5?alt=media&token=5172fe78-33df-4243-81cb-5f2697d2a3a7",
	boss: false,
	challenge: 16,
	zone: "abyss",
	resistances: {
		acid: 25,
		cold: 25,
		crushing: 25,
		fire: 25,
		lightning: 25,
		necrotic: 0,
		piercing: 25,
		poison: 25,
		radiant: 0,
		slashing: 25,
	},
	skills: ["attack", "double_strike", "obliterate", "powerful_blow"],
	stats: {
		charisma: 13,
		constitution: 20,
		dexterity: 10,
		intelligence: 5,
		strength: 20,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 16,
	naturalMinDamage: 7,
	naturalMaxDamage: 14,
	naturalDamageType: "crushing",
});
