import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "vilespawn",
	name: "Vilespawn",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC8t-vypjdsgapZvwLp?alt=media&token=8c989f52-8ee5-4001-b092-043015e7448a",
	rank: "normal",
	level: 15,
	threat: 15,
	attributes: {
		strength: 18,
		dexterity: 14,
		constitution: 16,
		intelligence: 6,
		wisdom: 12,
		charisma: 7,
	},
	combat: {
		hitDice: "15d8+62",
		armourClass: 15,
		proficiencyBonus: 5,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "2d4+2",
				type: "piercing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "leap_attack",
				rank: 2,
			},
			{
				skillId: "overpower",
				rank: 2,
			},
			{
				skillId: "toxic_bite",
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
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
