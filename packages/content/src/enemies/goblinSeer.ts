import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_seer",
	name: "Goblin Seer",
	shortName: "Seer",
	description:
		"A goblin diviner who channels fire, lightning, and fearful visions through his staff. The tribe consults his omens before sending raiders beyond the palisade.",
	portrait: "enemies/outpost/goblin_seer.png",
	rank: "normal",
	threat: 8,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 10,
		intelligence: 14,
		wisdom: 10,
		charisma: 8,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 13,
		initiative: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Fire Staff",
			icon: "items/weapons/staves/Staff_v2_35.png",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d8",
				type: "fire",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: ["venom_bolt", "acid_rain", "spook"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "outpost",
		weight: 1,
	},
	tags: [],
});
