import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "greyhorn_the_caged",
	name: "Greyhorn the Caged",
	portrait: "enemies/forest/greyhorn_the_caged.png",
	rank: "boss",
	threat: 14,
	attributes: {
		strength: 18,
		dexterity: 11,
		constitution: 16,
		intelligence: 6,
		wisdom: 16,
		charisma: 9,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 11,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["cleave", "minotaur_charge", "frenzy"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "wisdom"],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
