import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_hellfire_catapult",
	name: "The Hellfire Catapult",
	portrait: "enemies/desert/the_hellfire_catapult.png",
	rank: "boss",
	threat: 17,
	attributes: {
		strength: 20,
		dexterity: 14,
		constitution: 18,
		intelligence: 10,
		wisdom: 10,
		charisma: 5,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 16,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["disease_shot", "make_it_rain", "reposition"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "dexterity"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
