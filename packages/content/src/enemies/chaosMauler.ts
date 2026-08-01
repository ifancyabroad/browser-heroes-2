import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "chaos_mauler",
	name: "Chaos Mauler",
	portrait: "enemies/dungeon/chaos_mauler.png",
	rank: "normal",
	threat: 19,
	attributes: {
		strength: 22,
		dexterity: 12,
		constitution: 20,
		intelligence: 10,
		wisdom: 14,
		charisma: 14,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 18,
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
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["tenderise", "mighty_blow", "overpower"],
		featIds: [],
		tactic: "random",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
