import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_archer",
	name: "Ratman Archer",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_P6i6e4r31C74MN_B?alt=media&token=35159584-c7d9-4f43-a46e-c5cef815e5f6",
	rank: "normal",
	level: 10,
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
		hitDice: "10d8+25",
		armourClass: 12,
		proficiencyBonus: 4,
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
				skillId: "cripple",
				rank: 1,
			},
			{
				skillId: "poison_shot",
				rank: 1,
			},
		],
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
