import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_archer",
	name: "Goblin Archer",
	description:
		"A goblin bowman stationed along the outpost's palisades. He coats his arrows with venom prepared by the tribe's witch doctors.",
	portrait: "enemies/outpost/goblin_archer.png",
	rank: "normal",
	threat: 8,
	attributes: {
		strength: 8,
		dexterity: 15,
		constitution: 10,
		intelligence: 10,
		wisdom: 8,
		charisma: 8,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 14,
		initiative: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "ranged",
			name: "Shortbow",
			icon: "items/weapons/bows/Bow_01.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["poison_shot"],
		featIds: [],
		tactic: "default",
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
