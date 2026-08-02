import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "fire_elemental",
	name: "Fire Elemental",
	portrait: "enemies/tower/fire_elemental.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 12,
		dexterity: 19,
		constitution: 18,
		intelligence: 8,
		wisdom: 12,
		charisma: 7,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 14,
		damageAffinities: {
			resistances: ["acid", "crushing", "lightning", "piercing", "slashing"],
			immunities: ["fire", "poison"],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			name: "Burning Touch",
			attackAttribute: "dexterity",
			damage: {
				dice: "2d6",
				type: "fire",
				attribute: "dexterity",
			},
		},
		skillIds: ["double_strike", "burning_rampage"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
