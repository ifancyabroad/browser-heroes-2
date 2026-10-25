import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_great_fizzletrix",
	name: "The Great Fizzletrix",
	description:
		"A masked sorcerer who commands acid and lightning from a secluded marsh sanctuary. Local raiders surrender their finest scavenged relics in exchange for his protection.",
	portrait: "enemies/swamp/10.png",
	rank: "boss",
	threat: 19,
	attributes: {
		strength: 10,
		dexterity: 14,
		constitution: 18,
		intelligence: 20,
		wisdom: 16,
		charisma: 16,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 15,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Acid Staff",
			icon: "items/weapons/staves/staff_32.png",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d8+2",
				type: "acid",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: ["acid_rain", "lightning_bolt", "power_word_shield"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom", "charisma"],
	},
	encounter: {
		zone: "swamp",
		weight: 1,
	},
	tags: [],
});
