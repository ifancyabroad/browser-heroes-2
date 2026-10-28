import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bear_clan_hunter",
	name: "Bear Clan Hunter",
	description:
		"A patient bowman who follows game across the frozen uplands. Clan hunters mark safe crossings with antlers, though drifting snow often conceals the warnings.",
	portrait: "enemies/tundra/bear_clan_hunter.png",
	rank: "normal",
	threat: 20,
	attributes: {
		strength: 14,
		dexterity: 18,
		constitution: 16,
		intelligence: 10,
		wisdom: 16,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "ranged",
			name: "Exceptional Longbow",
			icon: "items/weapons/bows/Bow_03.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d8+3",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["hunterss_mark", "multi_shot", "frost_trap"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "wisdom"],
	},
	encounter: {
		zone: "tundra",
		weight: 1,
	},
	tags: [],
});
