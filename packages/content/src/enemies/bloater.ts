import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bloater",
	name: "Bloater",
	description:
		"A massive goblin bred for the tribe’s fighting pits, now serving as the outpost’s enforcer. Victorious breeders earn a place at the chieftain’s table.",
	portrait: "enemies/outpost/bloater.png",
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
