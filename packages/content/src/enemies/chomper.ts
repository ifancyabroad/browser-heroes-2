import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "chomper",
	name: "Chomper",
	portrait: "enemies/forest/chomper.png",
	rank: "normal",
	threat: 7,
	attributes: {
		strength: 12,
		dexterity: 14,
		constitution: 10,
		intelligence: 2,
		wisdom: 11,
		charisma: 4,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 6,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "dexterity",
			},
		},
		skillIds: ["poison_bite", "growth"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity", "strength"],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
