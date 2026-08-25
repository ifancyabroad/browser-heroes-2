import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "forsaken_brother_mcinnes",
	name: "Forsaken Brother McInnes",
	portrait: "enemies/abyss/forsaken_brother_mcinnes.png",
	rank: "boss",
	threat: 27,
	attributes: {
		strength: 12,
		dexterity: 14,
		constitution: 22,
		intelligence: 20,
		wisdom: 26,
		charisma: 18,
	},
	combat: {
		hitDie: "1d10",
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
			attackRange: "ranged",
			name: "Unholy Bolt",
			attackAttribute: "wisdom",
			damage: {
				dice: "2d8",
				type: "necrotic",
				damageClass: "magical",
				attribute: "wisdom",
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
