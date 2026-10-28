import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_archer",
	name: "Goblin Archer",
	description:
		"A goblin bowman stationed along the outpost's palisades. He coats his arrows with venom prepared by the tribe's witch doctors.",
	portrait: "enemies/outpost/goblin_archer.png",
	rank: "normal",
	threat: 10,
	attributes: {
		strength: 8,
		dexterity: 16,
		constitution: 12,
		intelligence: 10,
		wisdom: 10,
		charisma: 8,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "ranged",
			name: "Longbow",
			icon: "items/weapons/bows/Bow_01.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d8",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["poison_shot"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity"],
	},
	encounter: {
		zone: "outpost",
		weight: 1,
	},
	tags: [],
});
