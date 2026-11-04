import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bloater",
	name: "Bloater",
	description:
		"A massive goblin bred for the tribe’s fighting pits, now serving as the outpost’s enforcer. Victorious breeders earn a place at the chieftain’s table.",
	portrait: "enemies/outpost/bloater.png",
	rank: "normal",
	threat: 11,
	attributes: {
		strength: 15,
		dexterity: 10,
		constitution: 16,
		intelligence: 6,
		wisdom: 8,
		charisma: 8,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 10,
		initiative: 7,
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
		skillIds: ["heavy_strike"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution"],
	},
	encounter: {
		zone: "outpost",
		weight: 1,
	},
	tags: [],
});
