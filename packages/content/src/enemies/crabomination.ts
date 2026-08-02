import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "crabomination",
	name: "Crabomination",
	portrait: "enemies/ocean/crabomination.png",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 20,
		dexterity: 10,
		constitution: 22,
		intelligence: 6,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 18,
		damageAffinities: {
			resistances: ["cold"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["crab_hammer", "powerful_blow", "skull_bash"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
