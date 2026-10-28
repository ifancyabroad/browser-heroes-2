import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "deepborn_hunter",
	name: "Deepborn Hunter",
	description:
		"A Deepborn tracker who guides arrows with unnatural concentration. Captives taken beyond the temple provide the priesthood with knowledge of worlds it has yet to reach.",
	portrait: "enemies/temple/deepborn_hunter.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 12,
		dexterity: 18,
		constitution: 14,
		intelligence: 16,
		wisdom: 14,
		charisma: 12,
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
			name: "Superior Longbow",
			icon: "items/weapons/bows/Bow_03.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d8+2",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["take_aim", "cripple", "unholy_strike"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "wisdom"],
	},
	encounter: {
		zone: "temple",
		weight: 1,
	},
	tags: [],
});
