import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "sir_michael_the_conceder",
	name: "Sir Michael the Conceder",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-aHa_lmK0ULBAQ4z3?alt=media&token=83dc0e92-a720-44e0-a04c-405badd818f2",
	rank: "boss",
	threat: 14,
	attributes: {
		strength: 18,
		dexterity: 16,
		constitution: 18,
		intelligence: 10,
		wisdom: 16,
		charisma: 10,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 10,
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
				skillId: "charge",
				rank: 3,
			},
			{
				skillId: "holy_strike",
				rank: 3,
			},
			{
				skillId: "thou_hast_bested_me",
				rank: 3,
			},
		],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "dexterity"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
