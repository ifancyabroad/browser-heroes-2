import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "drakus_the_awakened",
	name: "Drakus the Awakened",
	description: "A dragon.",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NNvOKycvGLGjgkXhAwj?alt=media&token=c2519452-b55a-4e83-8e7f-cc06ec866d16",
	rank: "boss",
	level: 23,
	threat: 23,
	attributes: {
		strength: 27,
		dexterity: 10,
		constitution: 25,
		intelligence: 16,
		wisdom: 13,
		charisma: 21,
	},
	combat: {
		hitDice: "23d12+297",
		armourClass: 22,
		proficiencyBonus: 7,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "2d4+4",
				type: "piercing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "deafening_roar",
				rank: 3,
			},
			{
				skillId: "fire_breath",
				rank: 3,
			},
			{
				skillId: "dragon_focus",
				rank: 3,
			},
			{
				skillId: "multi_strike",
				rank: 3,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "charisma"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
