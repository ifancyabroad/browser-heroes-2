import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "cursed_guardian",
	name: "Cursed Guardian",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4gpGHT8virE-rpPW4?alt=media&token=4dcf99f3-4ca3-4f9d-9535-b32dd956908c",
	rank: "normal",
	threat: 20,
	attributes: {
		strength: 22,
		dexterity: 14,
		constitution: 21,
		intelligence: 5,
		wisdom: 10,
		charisma: 13,
	},
	combat: {
		hitDice: "1d8+6",
		armourClass: 18,
		proficiencyBonus: 6,
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
				dice: "1d8+6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "obliterate",
				rank: 2,
			},
			{
				skillId: "devour_soul",
				rank: 2,
			},
			{
				skillId: "double_strike",
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
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
