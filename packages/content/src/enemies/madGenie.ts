import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "mad_genie",
	name: "Mad Genie",
	description:
		"A captive elemental twisted by centuries of service within the citadel. The wording of its original bargain survives only in fragments carved beneath its golden bands.",
	portrait: "enemies/citadel/mad_genie.png",
	rank: "normal",
	threat: 24,
	attributes: {
		strength: 21,
		dexterity: 16,
		constitution: 22,
		intelligence: 20,
		wisdom: 16,
		charisma: 20,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 17,
		damageAffinities: {
			resistances: ["acid", "cold", "fire", "crushing", "piercing", "slashing"],
			immunities: ["lightning", "poison"],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Exceptional Storm Sceptre",
			icon: "items/weapons/staves/staff_40.png",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d8+3",
				type: "lightning",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: ["chain_lightning", "cone_of_cold", "embrace_elements"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["dexterity", "wisdom", "charisma"],
	},
	encounter: {
		zone: "citadel",
		weight: 1,
	},
	tags: [],
});
