import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "styx_the_cragrunner",
	name: "Styx the Cragrunner",
	description:
		"A human hunter who commands the high passes through traps and precise bowshots. Caravan masters pay for his guidance and seldom question the trophies beneath his skull mask.",
	portrait: "enemies/mountain/styx_the_cragrunner.png",
	rank: "boss",
	threat: 21,
	attributes: {
		strength: 12,
		dexterity: 20,
		constitution: 16,
		intelligence: 12,
		wisdom: 16,
		charisma: 12,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 18,
		initiative: 15,
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
		skillIds: ["hunterss_mark", "multi_shot", "trip_wire", "explosive_shot"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution", "wisdom"],
	},
	encounter: {
		zone: "mountain",
		weight: 1,
	},
	tags: [],
});
