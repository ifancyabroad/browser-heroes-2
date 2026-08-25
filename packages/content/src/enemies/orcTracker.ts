import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_tracker",
	name: "Orc Tracker",
	portrait: "enemies/plains/orc_tracker.png",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 14,
		dexterity: 18,
		constitution: 16,
		intelligence: 10,
		wisdom: 11,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "ranged",
			name: "Fine Longbow",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d8+1",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["multi_shot", "take_aim", "trip_wire"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "wisdom"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
