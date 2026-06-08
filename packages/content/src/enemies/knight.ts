import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "knight",
	name: "Knight",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-TgKSeZTRHhQWIyIs?alt=media&token=eb6eacf8-48c4-4f7f-8242-a737045ed309",
	rank: "normal",
	level: 13,
	threat: 13,
	attributes: {
		strength: 16,
		dexterity: 14,
		constitution: 14,
		intelligence: 10,
		wisdom: 14,
		charisma: 10,
	},
	combat: {
		hitDice: "13d8+42",
		armourClass: 10,
		proficiencyBonus: 5,
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
				skillId: "stand_ground",
				rank: 2,
			},
			{
				skillId: "armour_break",
				rank: 2,
			},
			{
				skillId: "holy_strike",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "dexterity"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
