import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wraith_lord_malakar",
	name: "Wraith Lord Malakar",
	portrait: "enemies/hills/wraith_lord_malakar.png",
	rank: "boss",
	threat: 22,
	attributes: {
		strength: 6,
		dexterity: 16,
		constitution: 16,
		intelligence: 12,
		wisdom: 14,
		charisma: 15,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 16,
		damageAffinities: {
			resistances: ["acid", "cold", "crushing", "fire", "lightning", "piercing", "slashing"],
			immunities: ["necrotic", "poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Withering Touch",
			attackAttribute: "dexterity",
			damage: {
				dice: "2d6",
				type: "necrotic",
				damageClass: "magical",
				attribute: "dexterity",
			},
		},
		skillIds: ["corrupting_touch", "wail", "cloak_of_shadows"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["dexterity", "wisdom", "charisma"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
