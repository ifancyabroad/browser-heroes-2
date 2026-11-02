import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "vampire_lord",
	name: "Vampire Lord",
	description:
		"An ancient vampire who has traded courtly finery for a soldier's weapon and armour. Debts owed to his household survive the deaths of those who incurred them.",
	portrait: "enemies/citadel/vampire_lord.png",
	rank: "normal",
	threat: 24,
	attributes: {
		strength: 22,
		dexterity: 18,
		constitution: 18,
		intelligence: 16,
		wisdom: 18,
		charisma: 20,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 18,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"fire",
				"lightning",
				"necrotic",
				"crushing",
				"piercing",
				"slashing",
			],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Exceptional Falchion",
			icon: "items/weapons/swords/Sword_54.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d6+3",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "drain_life", "drain_energy"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "wisdom", "charisma"],
	},
	encounter: {
		zone: "citadel",
		weight: 1,
	},
	tags: [],
});
