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
		skillIds: ["disarm", "whirlwind_strike"],
		featIds: ["focus_energy"],
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
