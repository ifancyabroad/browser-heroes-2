import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_chieftain_rotfang",
	name: "Goblin Chieftain Rotfang",
	description:
		"A goblin chieftain who holds the outpost through force and carefully guarded alliances. Scavenged plate and a prized blade mark his authority among the tribe.",
	portrait: "enemies/outpost/08_Gb.PNG",
	rank: "boss",
	threat: 15,
	attributes: {
		strength: 14,
		dexterity: 16,
		constitution: 18,
		intelligence: 10,
		wisdom: 10,
		charisma: 12,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 18,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Fine Scimitar",
			icon: "items/weapons/swords/Sword_v2_01.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6+1",
				type: "slashing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["rend", "go_for_the_eyes", "shield_wall"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution", "charisma"],
	},
	encounter: {
		zone: "outpost",
		weight: 1,
	},
	tags: [],
});
