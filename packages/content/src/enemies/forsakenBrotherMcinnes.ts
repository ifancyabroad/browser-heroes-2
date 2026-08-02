import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "forsaken_brother_mcinnes",
	name: "Forsaken Brother McInnes",
	portrait: "enemies/abyss/forsaken_brother_mcinnes.png",
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
		hitDie: "1d8",
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
		savingThrows: ["constitution", "wisdom", "charisma"],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
