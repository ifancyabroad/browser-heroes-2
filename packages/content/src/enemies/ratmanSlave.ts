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
		skillIds: ["poison_bomb"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "wisdom"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
