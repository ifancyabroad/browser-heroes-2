import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "worg",
	name: "Worg",
	description: "A wolf like creatue.",
	portrait: "enemies/forest/worg.png",
	rank: "normal",
	threat: 7,
	attributes: {
		strength: 14,
		dexterity: 11,
		constitution: 11,
		intelligence: 7,
		wisdom: 11,
		charisma: 8,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 8,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: [],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
