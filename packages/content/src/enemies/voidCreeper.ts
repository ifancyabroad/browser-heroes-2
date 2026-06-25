import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "void_creeper",
	name: "Void Creeper",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dNPoAEQhZpCpSnOye?alt=media&token=3aef2883-32c4-48ac-9eeb-b27138ccb665",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 9,
		dexterity: 14,
		constitution: 16,
		intelligence: 20,
		wisdom: 18,
		charisma: 13,
	},
	combat: {
		hitDice: "17d8+69",
		armourClass: 16,
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
				skillId: "cone_of_cold",
				rank: 2,
			},
			{
				skillId: "drain_life",
				rank: 2,
			},
			{
				skillId: "psionic_blast",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
