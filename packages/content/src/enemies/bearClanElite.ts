import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bear_clan_elite",
	name: "Bear Clan Elite",
	description:
		"A veteran sworn to hold the line around the jarl's household. The names carved inside his shield belong to companions who once stood beside him.",
	portrait: "enemies/tundra/bear_clan_elite.png",
	rank: "normal",
	threat: 21,
	attributes: {
		strength: 20,
		dexterity: 14,
		constitution: 18,
		intelligence: 10,
		wisdom: 12,
		charisma: 10,
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
			name: "Exceptional Longsword",
			icon: "items/weapons/swords/Sword_17.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+3",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "overpower", "shield_bash"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "tundra",
		weight: 1,
	},
	tags: [],
});
