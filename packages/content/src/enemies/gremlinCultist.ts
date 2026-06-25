import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "gremlin_cultist",
	name: "Gremlin Cultist",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9PwVr22rd-Chw1ykw?alt=media&token=1812558e-0bdc-49e0-8074-1ad8680833b4",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 12,
		intelligence: 10,
		wisdom: 16,
		charisma: 12,
	},
	combat: {
		hitDice: "14d8+31",
		armourClass: 14,
		proficiencyBonus: 5,
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
				skillId: "curse",
				rank: 2,
			},
			{
				skillId: "chosen_by_the_nameless",
				rank: 2,
			},
			{
				skillId: "drain_life",
				rank: 2,
			},
			{
				skillId: "power_word_confusion",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["wisdom", "dexterity"],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
