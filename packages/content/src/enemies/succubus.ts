import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "succubus",
	name: "Succubus",
	description:
		"A winged temptress who weakens resolve with promises before drawing vitality from her victims. The courts of Hell value the secrets surrendered in her company.",
	portrait: "enemies/hell/succubus.png",
	rank: "normal",
	threat: 23,
	attributes: {
		strength: 8,
		dexterity: 17,
		constitution: 13,
		intelligence: 15,
		wisdom: 12,
		charisma: 20,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
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
			attackRange: "ranged",
			name: "Hellfire",
			icon: "skills/warlock/flame_arrow.png",
			attackAttribute: "charisma",
			damage: {
				dice: "2d8",
				type: "fire",
				damageClass: "magical",
				attribute: "charisma",
			},
		},
		skillIds: ["unwavering_lies", "drain_life", "fireball"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["dexterity", "wisdom", "charisma"],
	},
	encounter: {
		zone: "hell",
		weight: 1,
	},
	tags: [],
});
