import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_great_fizzletrix",
	name: "The Great Fizzletrix",
	description:
		"A masked sorcerer who commands acid and lightning from a secluded marsh sanctuary. Local raiders surrender their finest scavenged relics in exchange for his protection.",
	portrait: "enemies/swamp/the_great_fizzletrix.png",
	rank: "boss",
	threat: 16,
	attributes: {
		strength: 10,
		dexterity: 12,
		constitution: 16,
		intelligence: 18,
		wisdom: 16,
		charisma: 16,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		initiative: 10,
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
				dice: "1d8+1",
				type: "acid",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: ["cursing_bolt", "acid_rain", "swamp_magic"],
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
