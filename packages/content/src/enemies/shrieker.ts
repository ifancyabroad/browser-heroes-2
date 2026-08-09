import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "shrieker",
	name: "Shrieker",
	portrait: "enemies/forest/shrieker.png",
	rank: "normal",
	threat: 7,
	attributes: {
		strength: 12,
		dexterity: 10,
		constitution: 10,
		intelligence: 2,
		wisdom: 10,
		charisma: 5,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 10,
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
		skillIds: ["evasion", "deafening_screech"],
		featIds: [],
		tactic: "aggressive",
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
