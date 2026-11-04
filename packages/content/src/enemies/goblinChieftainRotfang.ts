import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_chieftain_rotfang",
	name: "Goblin Chieftain Rotfang",
	description:
		"An armoured chieftain who rules the outpost with a prized curved blade. Rival claimants have supplied much of the scavenged plate protecting him.",
	portrait: "enemies/outpost/goblin_chieftain_rotfang.png",
	rank: "boss",
	threat: 14,
	attributes: {
		strength: 12,
		dexterity: 16,
		constitution: 14,
		intelligence: 10,
		wisdom: 8,
		charisma: 12,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 17,
		initiative: 11,
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
		skillIds: ["rend", "go_for_the_eyes", "battle_cry"],
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
