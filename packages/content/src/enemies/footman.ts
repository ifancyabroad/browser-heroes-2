import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "footman",
	name: "Footman",
	portrait: "enemies/castle/footman.png",
	rank: "normal",
	threat: 11,
	attributes: {
		strength: 14,
		dexterity: 14,
		constitution: 14,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Battleaxe",
			attackAttribute: "strength",
			damage: {
				dice: "1d10",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["heavy_strike", "armour_break"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
