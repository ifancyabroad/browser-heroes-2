import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "power_elemental",
	name: "Power Elemental",
	portrait: "enemies/tower/power_elemental.png",
	rank: "normal",
	threat: 28,
	attributes: {
		strength: 22,
		dexterity: 10,
		constitution: 20,
		intelligence: 8,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 18,
		damageAffinities: {
			resistances: ["acid", "crushing", "fire", "lightning", "piercing", "slashing"],
			immunities: ["poison"],
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
		skillIds: ["double_strike", "overcharge", "obliterate"],
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
