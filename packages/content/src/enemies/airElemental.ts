import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "air_elemental",
	name: "Air Elemental",
	portrait: "enemies/tower/air_elemental.png",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 18,
		dexterity: 22,
		constitution: 16,
		intelligence: 8,
		wisdom: 12,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
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
				dice: "2d4+2",
				type: "lightning",
				attribute: "dexterity",
			},
		},
		skillIds: ["double_strike", "cyclone"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "strength"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
