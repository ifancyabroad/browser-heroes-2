import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_fanatic",
	name: "Goblin Fanatic",
	description:
		"A tribal zealot who fights with curved knives coated in venom. He darts around his enemies, cutting exposed flesh before slipping beyond their reach.",
	portrait: "enemies/outpost/04_Gb.PNG",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 12,
		dexterity: 16,
		constitution: 12,
		intelligence: 10,
		wisdom: 8,
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
			attackRange: "melee",
			name: "Twin Daggers",
			icon: "items/weapons/daggers/Dagger_05.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "2d4",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["poison_jab", "evasion"],
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
