import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_forest_guardian",
	name: "The Forest Guardian",
	portrait: "enemies/forest/the_forest_guardian.png",
	rank: "boss",
	threat: 13,
	attributes: {
		strength: 10,
		dexterity: 14,
		constitution: 15,
		intelligence: 6,
		wisdom: 10,
		charisma: 7,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 14,
		damageAffinities: {
			resistances: ["crushing", "piercing", "slashing"],
			immunities: ["fire", "poison"],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Burning Touch",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d8",
				type: "fire",
				damageClass: "magical",
				attribute: "dexterity",
			},
		},
		skillIds: ["double_strike", "focus_energy", "stoke_the_flames"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["constitution", "wisdom"],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
