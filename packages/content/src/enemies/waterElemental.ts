import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "water_elemental",
	name: "Water Elemental",
	description: "A surge of living water that rises around its prey and closes overhead.",
	portrait: "enemies/tower/water_elemental.png",
	rank: "normal",
	threat: 27,
	attributes: {
		strength: 20,
		dexterity: 16,
		constitution: 18,
		intelligence: 5,
		wisdom: 10,
		charisma: 8,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 15,
		damageAffinities: {
			resistances: ["acid", "cold", "crushing", "fire", "lightning", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: [],
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
		skillIds: ["double_strike", "whelm"],
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
