import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "magma_elemental",
	name: "Magma Elemental",
	portrait: "enemies/tower/magma_elemental.png",
	rank: "normal",
	threat: 28,
	attributes: {
		strength: 24,
		dexterity: 8,
		constitution: 19,
		intelligence: 8,
		wisdom: 11,
		charisma: 11,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 19,
		damageAffinities: {
			resistances: ["acid", "crushing", "lightning", "piercing", "slashing"],
			immunities: ["fire", "poison"],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "2d8",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "molten_overdrive", "flame_slam"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
