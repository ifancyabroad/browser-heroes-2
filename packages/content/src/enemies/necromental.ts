import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "necromental",
	name: "Necromental",
	description:
		"A spirit of death that assembles a body from the bones of many creatures. The tower’s scholars sought to bind death itself; their remains became part of the result.",
	portrait: "enemies/tower/necromental.png",
	rank: "normal",
	threat: 27,
	attributes: {
		strength: 20,
		dexterity: 14,
		constitution: 18,
		intelligence: 8,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 17,
		damageAffinities: {
			resistances: ["acid", "cold", "fire", "lightning", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["crushing", "radiant"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Claw",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "reassemble", "devour_soul"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "wisdom"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
