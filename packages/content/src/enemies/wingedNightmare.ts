import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "winged_nightmare",
	name: "Winged Nightmare",
	portrait: "enemies/abyss/winged_nightmare.png",
	rank: "normal",
	threat: 24,
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
			attackRange: "melee",
			name: "Exceptional Longsword",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+3",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damage",
							target: "enemy",
							damageType: "lightning",
							damageClass: "magical",
							dice: "1d10",
						},
					],
				},
			],
		},
		skillIds: ["evasion", "drop_from_above"],
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
