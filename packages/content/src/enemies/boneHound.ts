import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bone_hound",
	name: "Bone Hound",
	shortName: "Bone Hound",
	description:
		"A hound rebuilt from sharpened bones and driven by a captive spirit. Citadel wardens release it wherever the outer walls have been breached.",
	portrait: "enemies/citadel/bone_hound.png",
	rank: "normal",
	threat: 20,
	attributes: {
		strength: 14,
		dexterity: 14,
		constitution: 14,
		intelligence: 3,
		wisdom: 12,
		charisma: 5,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 14,
		initiative: 11,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["crushing"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Bite",
			icon: "skills/common/bite.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["leap_attack", "deathly_howl"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "citadel",
		weight: 1,
	},
	tags: [],
});
