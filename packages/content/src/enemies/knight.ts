import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "knight",
	name: "Knight",
	portrait: "enemies/castle/knight.png",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 16,
		dexterity: 14,
		constitution: 14,
		intelligence: 10,
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
			name: "Longsword",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["stand_ground", "armour_break", "holy_strike"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
