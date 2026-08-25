import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "hell_guard",
	name: "Hell Guard",
	portrait: "enemies/dungeon/hell_guard.png",
	rank: "normal",
	threat: 23,
	attributes: {
		strength: 16,
		dexterity: 22,
		constitution: 18,
		intelligence: 10,
		wisdom: 12,
		charisma: 14,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 16,
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
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "ranged",
			name: "Masterwork Crossbow",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d8+4",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["multi_shot", "drop_from_above", "hunterss_mark"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
