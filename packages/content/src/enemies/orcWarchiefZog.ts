import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_warchief_zog",
	name: "Orc Warchief Zog",
	description:
		"Knocks challengers flat and keeps hitting until the rest of the clan has seen enough.",
	portrait: "enemies/plains/orc_warchief_zog.png",
	rank: "boss",
	threat: 21,
	attributes: {
		strength: 20,
		dexterity: 16,
		constitution: 18,
		intelligence: 12,
		wisdom: 14,
		charisma: 10,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 18,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Superior Battleaxe",
			icon: "items/weapons/axes/Axe_11.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+2",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["berserk", "double_strike", "knock_down", "overpower"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "wisdom"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
