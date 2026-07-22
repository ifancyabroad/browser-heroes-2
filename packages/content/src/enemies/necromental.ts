import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "necromental",
	name: "Necromental",
	portrait: "enemies/tower/necromental.png",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 20,
		dexterity: 14,
		constitution: 18,
		intelligence: 8,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 17,
		damageAffinities: {
			resistances: ["acid", "cold", "fire", "lightning", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["crushing", "radiant"],
		},
		basicAttack: {
			name: "Claw",
			attackAttribute: "strength",
			damage: {
				dice: "2d4+2",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "reassemble", "devour_soul"],
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
