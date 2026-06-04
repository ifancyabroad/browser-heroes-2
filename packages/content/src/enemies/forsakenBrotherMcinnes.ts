import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "forsaken_brother_mcinnes",
	name: "Forsaken Brother McInnes",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC7opH8h6jHe_KfFoND?alt=media&token=011f1cb2-db44-4353-a6b5-1ac6de62e142",
	boss: true,
	challenge: 23,
	zone: "abyss",
	resistances: {
		acid: 25,
		cold: 25,
		crushing: 25,
		fire: 25,
		lightning: 25,
		necrotic: 100,
		piercing: 25,
		poison: 25,
		radiant: -50,
		slashing: 25,
	},
	skills: [
		"attack",
		"power_word_pain",
		"drain_life",
		"will_of_the_deceiver",
		"unwavering_lies",
		"cure_critical_wounds",
	],
	stats: {
		charisma: 18,
		constitution: 22,
		dexterity: 14,
		intelligence: 20,
		strength: 12,
		wisdom: 26,
	},
	tactics: "caster",
	naturalArmourClass: 20,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
});
