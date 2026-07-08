import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "forsaken_brother_mcinnes",
	name: "Forsaken Brother McInnes",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC7opH8h6jHe_KfFoND?alt=media&token=011f1cb2-db44-4353-a6b5-1ac6de62e142",
	rank: "boss",
	threat: 23,
	attributes: {
		strength: 12,
		dexterity: 14,
		constitution: 22,
		intelligence: 20,
		wisdom: 26,
		charisma: 18,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 20,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: ["necrotic"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: [
			"power_word_pain",
			"drain_life",
			"will_of_the_deceiver",
			"unwavering_lies",
			"cure_critical_wounds",
		],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["wisdom", "constitution", "intelligence"],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
