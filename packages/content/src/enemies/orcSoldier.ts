import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_soldier",
	name: "Orc Soldier",
	portrait: "enemies/plains/orc_soldier.png",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 18,
		dexterity: 14,
		constitution: 16,
		intelligence: 7,
		wisdom: 11,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 16,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Handaxe",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["heavy_strike", "rend", "armour_break"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
