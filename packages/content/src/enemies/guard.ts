import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "guard",
	name: "Guard",
	portrait: "enemies/castle/guard.png",
	rank: "normal",
	threat: 10,
	attributes: {
		strength: 10,
		dexterity: 14,
		constitution: 12,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "ranged",
			name: "Longbow",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d8",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["cripple", "take_aim"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["dexterity"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
