import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "mountain_wolf",
	name: "Mountain Wolf",
	description:
		"A powerful wolf that follows game along the mountain's narrow ridges. Shepherds abandon familiar routes when its pack begins watching the crossings.",
	portrait: "enemies/mountain/mountain_wolf.png",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 17,
		dexterity: 15,
		constitution: 15,
		intelligence: 3,
		wisdom: 12,
		charisma: 7,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Bite",
			icon: "skills/common/bite.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["leap_attack", "detect_blood"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "mountain",
		weight: 1,
	},
	tags: [],
});
