import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "quasit",
	name: "Quasit",
	description:
		"A winged spellcaster who curses its enemies and hurls fire from behind an arcane shield. Greater fiends employ it to spy on rivals and torment prisoners.",
	portrait: "enemies/hell/quasit.png",
	rank: "normal",
	threat: 19,
	attributes: {
		strength: 5,
		dexterity: 14,
		constitution: 10,
		intelligence: 17,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 13,
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
			attackRange: "melee",
			name: "Claws",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d4",
				type: "slashing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["cursing_bolt", "arcane_shield", "fireball"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "hell",
		weight: 1,
	},
	tags: [],
});
