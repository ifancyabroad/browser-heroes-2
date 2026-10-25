import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "vhorak_and_the_obliterator",
	name: "Vhorak and the Obliterator",
	description:
		"A Deepborn siege-master who carries the Obliterator into battle against the temple's enemies. Its ammunition is forged from tribute surrendered by worlds that resisted Og'munsta's worship.",
	portrait: "enemies/temple/01.PNG",
	rank: "boss",
	threat: 22,
	attributes: {
		strength: 20,
		dexterity: 14,
		constitution: 18,
		intelligence: 18,
		wisdom: 16,
		charisma: 16,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 18,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "ranged",
			name: "Obliterator",
			icon: "items/weapons/crossbows/Crossbow_07.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d8+2",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["head_shot", "multi_shot", "make_it_rain"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution", "intelligence"],
	},
	encounter: {
		zone: "temple",
		weight: 1,
	},
	tags: [],
});
