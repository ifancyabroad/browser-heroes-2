import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "chaos_knight",
	name: "Chaos Knight",
	portrait: "enemies/dungeon/chaos_knight.png",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 20,
		dexterity: 18,
		constitution: 20,
		intelligence: 10,
		wisdom: 14,
		charisma: 14,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 19,
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
			name: "Greatsword",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["disarm", "focus_energy", "whirlwind_strike"],
		featIds: [],
		tactic: "random",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "charisma"],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
