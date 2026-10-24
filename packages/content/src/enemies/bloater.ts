import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bloater",
	name: "Bloater",
	description:
		"An unusually large goblin bred for strength and endurance in the tribe's fighting pits. He serves as the outpost's enforcer, wielding a heavy greatclub.",
	portrait: "enemies/outpost/09_Gb.PNG",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 16,
		dexterity: 10,
		constitution: 18,
		intelligence: 6,
		wisdom: 8,
		charisma: 8,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Greatclub",
			icon: "items/weapons/clubs/Club_v2_05.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["heavy_strike", "skull_bash"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "outpost",
		weight: 1,
	},
	tags: [],
});
