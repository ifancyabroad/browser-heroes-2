import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_warchief_zog",
	name: "Orc Warchief Zog",
	portrait: "enemies/plains/orc_warchief_zog.png",
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
		hitDie: "1d8",
		armourClass: 19,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Fine Battleaxe",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+1",
				type: "slashing",
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
