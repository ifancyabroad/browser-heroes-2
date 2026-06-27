import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "abomination",
	name: "Abomination",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NKt3ujmy2tXghwqSM9o?alt=media&token=523b97cb-dd08-4c3c-a1dd-e44f82e0fc54",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 20,
		dexterity: 10,
		constitution: 18,
		intelligence: 3,
		wisdom: 6,
		charisma: 5,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
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
				skillId: "double_strike",
				rank: 2,
			},
			{
				skillId: "corrupted_arm",
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
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
