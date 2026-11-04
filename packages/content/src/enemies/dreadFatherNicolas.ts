import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "dread_father_nicolas",
	name: "Dread Father Nicolas",
	description:
		"An undead priest who keeps the citadel's congregation bound to its altars. His sermons name the dead individually, including those whose remains were never recovered.",
	portrait: "enemies/citadel/dread_father_nicolas.png",
	rank: "boss",
	threat: 28,
	attributes: {
		strength: 12,
		dexterity: 14,
		constitution: 22,
		intelligence: 18,
		wisdom: 26,
		charisma: 20,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 21,
		initiative: 10,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"fire",
				"lightning",
				"necrotic",
				"crushing",
				"piercing",
				"slashing",
			],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Masterwork Reliquary Staff",
			icon: "items/weapons/staves/staff_31.png",
			attackAttribute: "wisdom",
			damage: {
				dice: "1d8+4",
				type: "necrotic",
				damageClass: "magical",
				attribute: "wisdom",
			},
		},
		skillIds: [
			"power_word_pain",
			"power_word_shield",
			"power_word_confusion",
			"power_word_decay",
		],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["constitution", "wisdom", "charisma"],
	},
	encounter: {
		zone: "citadel",
		weight: 1,
	},
	tags: [],
});
