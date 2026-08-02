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
		hitDie: "1d8",
		armourClass: 16,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["crushing", "radiant"],
		},
		basicAttack: {
			name: "Fine Battleaxe",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+1",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["knock_down", "execute", "powerful_blow"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
