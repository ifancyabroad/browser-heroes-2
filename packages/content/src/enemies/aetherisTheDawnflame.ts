import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "aetheris_the_dawnflame",
	name: "Aetheris the Dawnflame",
	portrait: "enemies/tower/aetheris_the_dawnflame.png",
	rank: "boss",
	threat: 30,
	attributes: {
		strength: 30,
		dexterity: 14,
		constitution: 29,
		intelligence: 18,
		wisdom: 17,
		charisma: 28,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 24,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"necrotic",
				"piercing",
				"poison",
				"radiant",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "4d10",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: [
			"dragon_focus",
			"multi_strike",
			"breath_of_the_dawnflame",
			"boon_of_the_dawnflame",
			"rebirth",
		],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution", "wisdom", "charisma"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
