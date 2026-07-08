import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_warchief_zog",
	name: "Orc Warchief Zog",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-xKrcqlLxbc3dyPP_?alt=media&token=d7ecd1dc-2a03-4bba-89c5-3d1c598e07ed",
	rank: "boss",
	threat: 20,
	attributes: {
		strength: 20,
		dexterity: 16,
		constitution: 18,
		intelligence: 12,
		wisdom: 14,
		charisma: 10,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 13,
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
		skillIds: ["berserk", "double_strike", "knock_down", "overpower"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "dexterity"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
