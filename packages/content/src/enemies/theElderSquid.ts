import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_elder_squid",
	name: "The Elder Squid",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dSO4fdChwx6OrOCx5?alt=media&token=6fda1fb4-5d7e-4f7a-b4e0-f4678f13a835",
	rank: "boss",
	threat: 22,
	attributes: {
		strength: 18,
		dexterity: 15,
		constitution: 18,
		intelligence: 25,
		wisdom: 22,
		charisma: 18,
	},
	combat: {
		hitDice: "1d12+10",
		armourClass: 17,
		proficiencyBonus: 7,
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
				skillId: "tentacle_wrap",
				rank: 3,
			},
			{
				skillId: "psionic_blast",
				rank: 3,
			},
			{
				skillId: "drain_life",
				rank: 3,
			},
		],
		featIds: ["arcane_warding", "siphoned_vigor"],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom", "strength"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
