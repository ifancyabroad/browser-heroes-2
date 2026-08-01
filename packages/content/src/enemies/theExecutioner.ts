import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_executioner",
	name: "The Executioner",
	portrait: "enemies/hills/the_executioner.png",
	rank: "boss",
	threat: 19,
	attributes: {
		strength: 22,
		dexterity: 10,
		constitution: 18,
		intelligence: 6,
		wisdom: 10,
		charisma: 8,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 16,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["crushing", "radiant"],
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
		skillIds: ["knock_down", "execute", "powerful_blow"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "dexterity"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
