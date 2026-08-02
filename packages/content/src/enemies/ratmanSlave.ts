import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_slave",
	name: "Ratman Slave",
	portrait: "enemies/desert/ratman_slave.png",
	rank: "normal",
	threat: 6,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 8,
		intelligence: 6,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 12,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Claw",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["poison_bomb"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
