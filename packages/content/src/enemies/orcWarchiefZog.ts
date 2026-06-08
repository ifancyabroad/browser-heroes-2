import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_warchief_zog",
	name: "Orc Warchief Zog",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-xKrcqlLxbc3dyPP_?alt=media&token=d7ecd1dc-2a03-4bba-89c5-3d1c598e07ed",
	rank: "boss",
	level: 20,
	threat: 20,
	attributes: {
		strength: 20,
		dexterity: 16,
		constitution: 18,
		intelligence: 12,
		wisdom: 14,
		charisma: 10,
	},
	combat: {
		hitDice: "20d12+200",
		armourClass: 13,
		proficiencyBonus: 6,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "berserk",
				rank: 3,
			},
			{
				skillId: "double_strike",
				rank: 3,
			},
			{
				skillId: "knock_down",
				rank: 3,
			},
			{
				skillId: "overpower",
				rank: 3,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "dexterity"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
