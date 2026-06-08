import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "giant_yeti",
	name: "Giant Yeti",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC8tbRx4aU1NA7LfKlE?alt=media&token=0b801580-197c-4c4d-b3ca-62a10fe6d8d2",
	rank: "normal",
	level: 19,
	threat: 19,
	attributes: {
		strength: 24,
		dexterity: 14,
		constitution: 22,
		intelligence: 6,
		wisdom: 14,
		charisma: 10,
	},
	combat: {
		hitDice: "19d8+133",
		armourClass: 18,
		proficiencyBonus: 6,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "double_strike",
				rank: 2,
			},
			{
				skillId: "deafening_roar",
				rank: 2,
			},
			{
				skillId: "tenderise",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
