import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wraith_lord_malakar",
	name: "Wraith Lord Malakar",
	portrait: "enemies/hills/wraith_lord_malakar.png",
	rank: "boss",
	threat: 21,
	attributes: {
		strength: 6,
		dexterity: 16,
		constitution: 16,
		intelligence: 12,
		wisdom: 14,
		charisma: 15,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 16,
		damageAffinities: {
			resistances: ["acid", "cold", "crushing", "fire", "lightning", "piercing", "slashing"],
			immunities: ["necrotic", "poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			name: "Withering Touch",
			attackAttribute: "charisma",
			damage: {
				dice: "1d8",
				type: "necrotic",
				attribute: "charisma",
			},
		},
		skillIds: ["corrupting_touch", "wail"],
		featIds: ["cloak_of_shadows"],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution", "charisma"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
