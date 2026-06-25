import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "crabomination",
	name: "Crabomination",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dO9Hor_-bf7V_xgzs?alt=media&token=db1ccc0d-5411-4124-af9b-9af25e3f4cfc",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 20,
		dexterity: 10,
		constitution: 22,
		intelligence: 6,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDice: "17d8+120",
		armourClass: 18,
		proficiencyBonus: 6,
		damageAffinities: {
			resistances: ["cold"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "2d4+2",
				type: "crushing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "crab_hammer",
				rank: 2,
			},
			{
				skillId: "powerful_blow",
				rank: 2,
			},
			{
				skillId: "skull_bash",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution", "strength"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
