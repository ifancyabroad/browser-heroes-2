import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_hero",
	name: "Goblin Hero",
	description:
		"A veteran goblin raider recognised for surviving battles beyond the outpost. He carries a curved sword, a scavenged shield, and poison bombs prepared for heavily defended foes.",
	portrait: "enemies/outpost/06_Gb.PNG",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 12,
		dexterity: 16,
		constitution: 14,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 16,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Scimitar",
			icon: "items/weapons/swords/Sword_v2_01.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "slashing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["poison_bomb", "shield_wall"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "outpost",
		weight: 1,
	},
	tags: [],
});
