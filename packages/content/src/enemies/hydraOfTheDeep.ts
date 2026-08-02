import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "hydra_of_the_deep",
	name: "Hydra of the Deep",
	portrait: "enemies/ocean/hydra_of_the_deep.png",
	rank: "boss",
	threat: 21,
	attributes: {
		strength: 24,
		dexterity: 10,
		constitution: 24,
		intelligence: 10,
		wisdom: 13,
		charisma: 14,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 18,
		damageAffinities: {
			resistances: ["cold", "poison"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "2d6+2",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["frost_breath", "deafening_roar", "dragon_focus", "multi_strike"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "wisdom"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
