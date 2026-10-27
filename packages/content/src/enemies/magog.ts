import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "magog",
	name: "Magog",
	description:
		"A horned firecaster who hurls burning projectiles into enemy ranks. Infernal commanders station these demons behind the advance, where retreat offers little shelter from their flames.",
	portrait: "enemies/hell/D_06.png",
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
			name: "Flame Bolt",
			icon: "skills/warlock/fireball.png",
			attackAttribute: "intelligence",
			damage: {
				dice: "2d8",
				type: "fire",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: ["fireball", "engulf", "piercing_magic"],
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
