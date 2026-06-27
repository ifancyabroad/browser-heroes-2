import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_executioner",
	name: "The Executioner",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkVOZVy5W_2PPD1vjr?alt=media&token=89a6ef6d-e141-4b2c-b6cf-f5fe2f0ae051",
	rank: "boss",
	threat: 19,
	attributes: {
		strength: 22,
		dexterity: 10,
		constitution: 18,
		intelligence: 6,
		wisdom: 10,
		charisma: 8,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 16,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["crushing", "radiant"],
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
				skillId: "knock_down",
				rank: 3,
			},
			{
				skillId: "execute",
				rank: 3,
			},
			{
				skillId: "powerful_blow",
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
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
