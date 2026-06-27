import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_nameless_one",
	name: "The Nameless One",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9QhTULKTqA4_qMU3E?alt=media&token=e08c09f2-dc55-4058-bf13-7c9badedfc7c",
	rank: "boss",
	threat: 26,
	attributes: {
		strength: 26,
		dexterity: 18,
		constitution: 26,
		intelligence: 5,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 22,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "2d4+8",
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
				skillId: "multi_strike",
				rank: 3,
			},
			{
				skillId: "horrifying_visage",
				rank: 3,
			},
			{
				skillId: "tentacle_crush",
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
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
