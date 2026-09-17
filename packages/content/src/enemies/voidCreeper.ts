import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "void_creeper",
	name: "Void Creeper",
	description:
		"A pale, many-eyed creature with dangling tendrils. Its presence chills the water and clouds the mind.",
	portrait: "enemies/ocean/void_creeper.png",
	rank: "normal",
	threat: 19,
	attributes: {
		strength: 9,
		dexterity: 14,
		constitution: 16,
		intelligence: 20,
		wisdom: 18,
		charisma: 13,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 16,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Tendril Strike",
			icon: "skills/common/tentacle_wrap.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "crushing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["cone_of_cold", "drain_life", "psionic_blast"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "charisma"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
