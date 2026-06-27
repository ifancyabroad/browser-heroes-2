import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "fire_snake",
	name: "Fire Snake",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgYk1uHzdomGArMmxVa?alt=media&token=d0825833-28ae-4445-8dcb-a31f457517a1",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 19,
		dexterity: 14,
		constitution: 12,
		intelligence: 1,
		wisdom: 10,
		charisma: 3,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 14,
		damageAffinities: {
			resistances: ["fire", "lightning"],
			immunities: [],
			vulnerabilities: ["cold"],
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
				skillId: "constrict",
				rank: 2,
			},
			{
				skillId: "flame_bite",
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
