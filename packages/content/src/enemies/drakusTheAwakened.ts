import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "drakus_the_awakened",
	name: "Drakus the Awakened",
	description: "A dragon.",
	portrait: "enemies/volcano/drakus_the_awakened.png",
	rank: "boss",
	threat: 26,
	attributes: {
		strength: 27,
		dexterity: 10,
		constitution: 25,
		intelligence: 16,
		wisdom: 13,
		charisma: 21,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 22,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "2d10",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["deafening_roar", "fire_breath", "dragon_focus", "multi_strike"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution", "wisdom", "charisma"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
