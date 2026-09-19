import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "magma_elemental",
	name: "Magma Elemental",
	description:
		"A fusion of earth and fire that breaks through obstacles with molten fists. The tower’s scorched summoning chambers record several attempts to separate its quarrelling halves.",
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
			attackRange: "melee",
			name: "Slam",
			icon: "skills/common/flame_slam.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d8",
				type: "crushing",
				damageClass: "physical",
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
