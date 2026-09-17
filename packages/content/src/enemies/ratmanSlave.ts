import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_slave",
	name: "Ratman Slave",
	description:
		"Survived the march on scraps and threats. The promise of freedom sounds less convincing each day.",
	portrait: "enemies/desert/ratman_slave.png",
	rank: "normal",
	threat: 8,
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
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Claw",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d4",
				type: "slashing",
				damageClass: "physical",
				attribute: "dexterity",
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
