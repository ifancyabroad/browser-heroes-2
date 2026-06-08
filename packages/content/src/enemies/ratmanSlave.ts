import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_slave",
	name: "Ratman Slave",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_O3wKJO9Pu6brBV24?alt=media&token=fd08e60c-fa58-4942-805a-a14d5ad55a28",
	rank: "normal",
	level: 6,
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
		hitDice: "6d8+7",
		armourClass: 12,
		proficiencyBonus: 3,
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
		skills: [
			{
				skillId: "poison_bomb",
				rank: 1,
			},
		],
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
