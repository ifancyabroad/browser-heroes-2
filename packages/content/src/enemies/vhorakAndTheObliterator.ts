import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "vhorak_and_the_obliterator",
	name: "Vhorak and the Obliterator",
	description:
		"A Deepborn siege-master who carries the Obliterator into battle against the temple's enemies. Its ammunition is forged from tribute surrendered by worlds that resisted Og'munsta's worship.",
	portrait: "enemies/temple/vhorak_and_the_obliterator.png",
	rank: "boss",
	threat: 21,
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
		initiative: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "ranged",
			name: "Obliterator",
			icon: "items/weapons/guns/Gun_v2_06.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d8+3",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["bomb_barrage", "acid_bomb", "multi_shot"],
		featIds: [],
		tactic: "default",
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
