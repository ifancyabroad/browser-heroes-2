import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "abyss_armour",
	name: "Abyss Armour",
	portrait: "enemies/abyss/abyss_armour.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 18,
		dexterity: 10,
		constitution: 18,
		intelligence: 10,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 20,
		damageAffinities: {
			resistances: ["acid", "cold", "crushing", "fire", "lightning", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Fine Longsword",
			attackAttribute: "strength",
			damage: {
				dice: "1d6+1",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["armour_break", "disarm", "wind_strike"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
