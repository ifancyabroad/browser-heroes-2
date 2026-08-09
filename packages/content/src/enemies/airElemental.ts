import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "air_elemental",
	name: "Air Elemental",
	portrait: "enemies/tower/air_elemental.png",
	rank: "normal",
	threat: 26,
	attributes: {
		strength: 18,
		dexterity: 22,
		constitution: 16,
		intelligence: 8,
		wisdom: 12,
		charisma: 6,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 16,
		damageAffinities: {
			resistances: ["acid", "cold", "crushing", "fire", "lightning", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Static Touch",
			attackAttribute: "dexterity",
			damage: {
				dice: "2d6",
				type: "lightning",
				attribute: "dexterity",
			},
		},
		skillIds: ["double_strike", "cyclone"],
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
