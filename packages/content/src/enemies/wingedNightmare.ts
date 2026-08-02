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
		hitDie: "1d10",
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
			name: "Greatsword",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["wind_strike", "evasion", "drop_from_above"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
