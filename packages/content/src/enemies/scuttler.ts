import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "scuttler",
	name: "Scuttler",
	description:
		"A venomous marsh crustacean that hides beneath floating vegetation and snaps at passing limbs. Reed gatherers probe the shallows before stepping away from their boats.",
	portrait: "enemies/swamp/08.png",
	rank: "normal",
	threat: 10,
	attributes: {
		strength: 14,
		dexterity: 14,
		constitution: 12,
		intelligence: 1,
		wisdom: 10,
		charisma: 3,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Pincer",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["poison_claw"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "swamp",
		weight: 1,
	},
	tags: [],
});
