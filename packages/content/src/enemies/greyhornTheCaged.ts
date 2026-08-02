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
		hitDie: "1d10",
		armourClass: 11,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
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
		skillIds: ["cleave", "minotaur_charge", "frenzy"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
