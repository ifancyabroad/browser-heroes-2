import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "norc_mercenary",
	name: "Norc Mercenary",
	description:
		"A broad-jawed island mercenary who breaks resistance with a heavy spiked club. Employers pay part of his fee before departure and the remainder before he enters their settlement.",
	portrait: "enemies/island/norc_mercenary.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 18,
		dexterity: 12,
		constitution: 16,
		intelligence: 8,
		wisdom: 10,
		charisma: 8,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Fine Greatclub",
			icon: "items/weapons/clubs/Club_v2_05.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+1",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["berserk", "crushing_blow"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "island",
		weight: 1,
	},
	tags: [],
});
