import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_nameless_one",
	name: "The Nameless One",
	portrait: "enemies/dungeon/the_nameless_one.png",
	rank: "boss",
	threat: 26,
	attributes: {
		strength: 26,
		dexterity: 18,
		constitution: 26,
		intelligence: 5,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 22,
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
				dice: "2d10",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["tentacle_wrap", "multi_strike", "horrifying_visage", "tentacle_crush"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "wisdom"],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
