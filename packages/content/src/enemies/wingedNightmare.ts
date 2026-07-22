import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "winged_nightmare",
	name: "Winged Nightmare",
	portrait: "enemies/abyss/winged_nightmare.png",
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
