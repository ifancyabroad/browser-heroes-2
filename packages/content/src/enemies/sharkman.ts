import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "sharkman",
	name: "Sharkman",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dMUJn3WZ9o8aQlNnb?alt=media&token=f60c8ec6-02cc-4617-bff1-cdc8f210dd83",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 16,
		dexterity: 15,
		constitution: 16,
		intelligence: 6,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: ["cold"],
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
				skillId: "charge",
				rank: 2,
			},
			{
				skillId: "detect_blood",
				rank: 2,
			},
			{
				skillId: "cold_bite",
				rank: 2,
			},
			{
				skillId: "rend",
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
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
