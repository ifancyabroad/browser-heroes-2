import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "flame_shrieker",
	name: "Flame Shrieker",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O1g2suyagydsOiCLMPZ?alt=media&token=2220862d-2939-4c71-a1b7-c0c9635fabfd",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 18,
		dexterity: 16,
		constitution: 14,
		intelligence: 3,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDice: "14d8+45",
		armourClass: 14,
		proficiencyBonus: 5,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "piercing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "burning_rampage",
				rank: 2,
			},
			{
				skillId: "deafening_screech",
				rank: 2,
			},
			{
				skillId: "leap_attack",
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
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
