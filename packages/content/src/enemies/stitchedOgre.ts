import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "stitched_ogre",
	name: "Stitched Ogre",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NKt0FqDCM_Ms7YFjWhj?alt=media&token=3eadfc3b-9be7-46d3-ae83-2e76394cd478",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 19,
		dexterity: 16,
		constitution: 16,
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
				skillId: "flurry",
				rank: 2,
			},
			{
				skillId: "expose_weakness",
				rank: 2,
			},
			{
				skillId: "shadow_strike",
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
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
