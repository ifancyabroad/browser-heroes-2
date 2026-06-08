import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "damp_high_priestess",
	name: "Damp High Priestess",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dQ6Mfco5z_8Yt4o-t?alt=media&token=37e454c3-4137-43e9-b96a-ebffe5d12d31",
	rank: "normal",
	level: 16,
	threat: 16,
	attributes: {
		strength: 11,
		dexterity: 14,
		constitution: 17,
		intelligence: 16,
		wisdom: 18,
		charisma: 14,
	},
	combat: {
		hitDice: "16d8+66",
		armourClass: 15,
		proficiencyBonus: 5,
		damageAffinities: {
			resistances: ["cold"],
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
				skillId: "power_word_fortitude",
				rank: 2,
			},
			{
				skillId: "cure_major_wounds",
				rank: 2,
			},
			{
				skillId: "flamestrike",
				rank: 2,
			},
			{
				skillId: "holy_bolt",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["wisdom", "constitution"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
