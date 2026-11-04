import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "manticore",
	name: "Manticore",
	description:
		"A winged mountain predator that scatters tail spikes before swooping down on wounded prey. Caravan guards recognise its nesting cliffs by the quills embedded in abandoned shields.",
	portrait: "enemies/mountain/manticore.png",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 17,
		dexterity: 16,
		constitution: 17,
		intelligence: 7,
		wisdom: 12,
		charisma: 8,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 14,
		initiative: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "ranged",
			name: "Tail Spike",
			icon: "skills/common/multi_shot.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d8",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["leap_attack", "impale"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "mountain",
		weight: 1,
	},
	tags: [],
});
