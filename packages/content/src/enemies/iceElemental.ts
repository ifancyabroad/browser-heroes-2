import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ice_elemental",
	name: "Ice Elemental",
	portrait: "enemies/tower/ice_elemental.png",
	rank: "normal",
	threat: 20,
	attributes: {
		strength: 24,
		dexterity: 18,
		constitution: 19,
		intelligence: 8,
		wisdom: 11,
		charisma: 11,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 20,
		damageAffinities: {
			resistances: ["acid", "crushing", "lightning", "piercing", "slashing"],
			immunities: ["cold", "poison"],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Freezing Touch",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+6",
				type: "cold",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "ice_punch"],
		featIds: [],
		tactic: "default",
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
