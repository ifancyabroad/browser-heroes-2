import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "carrion_stalker",
	name: "Carrion Stalker",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4Oe8U0xBhi76jwF3P?alt=media&token=98d5fb0b-49e6-4a89-9f1c-0d9936b2728e",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 14,
		dexterity: 16,
		constitution: 14,
		intelligence: 5,
		wisdom: 12,
		charisma: 7,
	},
	combat: {
		hitDice: "1d8+3",
		armourClass: 13,
		proficiencyBonus: 5,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "dexterity",
			},
		},
		skills: [
			{
				skillId: "detect_blood",
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
		savingThrows: ["dexterity", "strength"],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
