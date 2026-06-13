import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "pit_fiend_yagamon",
	name: "Pit Fiend Yagamon",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O1g5UbnObhA-7IMjEhj?alt=media&token=607165fd-970a-42c7-909c-0c366825351e",
	rank: "boss",
	level: 22,
	threat: 22,
	attributes: {
		strength: 26,
		dexterity: 14,
		constitution: 24,
		intelligence: 22,
		wisdom: 18,
		charisma: 24,
	},
	combat: {
		hitDice: "22d12+285",
		armourClass: 20,
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
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "2d4+4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "double_strike",
				rank: 3,
			},
			{
				skillId: "fireball",
				rank: 3,
			},
			{
				skillId: "fire_strike",
				rank: 3,
			},
			{
				skillId: "yagamons_revenge",
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
