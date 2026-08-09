import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_archer",
	name: "Ratman Archer",
	portrait: "enemies/desert/ratman_archer.png",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 8,
		dexterity: 16,
		constitution: 12,
		intelligence: 8,
		wisdom: 10,
		charisma: 6,
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
			name: "Fine Longbow",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d8+1",
				type: "piercing",
				attribute: "dexterity",
			},
		},
		skillIds: ["cripple", "poison_shot"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
