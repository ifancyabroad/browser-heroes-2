import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "winged_nightmare",
	name: "Winged Nightmare",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4ktfHDKaMkQPE_pHx?alt=media&token=5fcad994-cc82-4111-b9b4-57009dd40514",
	rank: "normal",
	threat: 19,
	attributes: {
		strength: 18,
		dexterity: 22,
		constitution: 18,
		intelligence: 10,
		wisdom: 14,
		charisma: 12,
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
		skillIds: ["wind_strike", "drop_from_above"],
		featIds: ["evasion"],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "strength"],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
