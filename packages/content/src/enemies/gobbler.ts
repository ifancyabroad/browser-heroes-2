import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "gobbler",
	name: "Gobbler",
	description:
		"A squat mountain scavenger that lunges from rocky crevices with its jaws spread wide. Travellers recognise its pale lure among the lights beside abandoned trails.",
	portrait: "enemies/mountain/gobbler.png",
	rank: "normal",
	threat: 10,
	attributes: {
		strength: 16,
		dexterity: 12,
		constitution: 14,
		intelligence: 2,
		wisdom: 10,
		charisma: 4,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 12,
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
				dice: "1d8",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["leap_attack"],
		featIds: [],
		tactic: "aggressive",
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
