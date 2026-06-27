import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "chaos_knight",
	name: "Chaos Knight",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC8tNczeWUPU9bCX5o4?alt=media&token=49c6b657-5da0-4639-931b-12b9dd50d725",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 20,
		dexterity: 18,
		constitution: 20,
		intelligence: 10,
		wisdom: 14,
		charisma: 14,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 18,
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
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "disarm",
				rank: 2,
			},
			{
				skillId: "whirlwind_strike",
				rank: 2,
			},
		],
		featIds: ["focus_energy"],
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
