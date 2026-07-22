import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_archer",
	name: "Ratman Archer",
	portrait: "enemies/desert/ratman_archer.png",
	rank: "normal",
	threat: 10,
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
		armourClass: 12,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Claw",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d4",
				type: "slashing",
				attribute: "dexterity",
			},
		},
		skillIds: ["cripple", "poison_shot"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
