import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "archmage_vorath",
	name: "Archmage Vorath",
	description:
		"The royal archmage, entrusted with the grove's oldest celestial workings. He remembers when the stars above its canopy followed a different course.",
	portrait: "enemies/grove/archmage_vorath.png",
	rank: "boss",
	threat: 25,
	attributes: {
		strength: 10,
		dexterity: 14,
		constitution: 18,
		intelligence: 24,
		wisdom: 20,
		charisma: 18,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 17,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Exceptional Starlight Staff",
			icon: "items/weapons/staves/staff_29.png",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d8+3",
				type: "radiant",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: ["chain_lightning", "flamestrike", "power_word_shield", "elemental_shield"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom", "charisma"],
	},
	encounter: {
		zone: "grove",
		weight: 1,
	},
	tags: [],
});
