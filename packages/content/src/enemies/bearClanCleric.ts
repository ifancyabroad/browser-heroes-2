import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bear_clan_cleric",
	name: "Bear Clan Cleric",
	description:
		"A warrior-priest who carries the clan's blessings into battle. Before each expedition, he recites the names of those whose remains never returned from the snow.",
	portrait: "enemies/tundra/bear_clan_cleric.png",
	rank: "normal",
	threat: 20,
	attributes: {
		strength: 18,
		dexterity: 14,
		constitution: 16,
		intelligence: 10,
		wisdom: 18,
		charisma: 12,
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
			name: "Exceptional Stone Greatclub",
			icon: "items/weapons/clubs/Club_v2_06.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+3",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["holy_strike", "flamestrike", "cure_major_wounds", "prayer"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["wisdom"],
	},
	encounter: {
		zone: "tundra",
		weight: 1,
	},
	tags: [],
});
