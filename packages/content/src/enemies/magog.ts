import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "magog",
	name: "Magog",
	shortName: "Magog",
	description:
		"A horned firecaster who hurls burning projectiles into enemy ranks. Infernal commanders station these demons behind the advance, where retreat offers little shelter from their flames.",
	portrait: "enemies/hell/magog.png",
	rank: "normal",
	threat: 23,
	attributes: {
		strength: 14,
		dexterity: 14,
		constitution: 16,
		intelligence: 18,
		wisdom: 12,
		charisma: 14,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		initiative: 10,
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
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["fireball", "inferno"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom"],
	},
	encounter: {
		zone: "hell",
		weight: 1,
	},
	tags: [],
});
