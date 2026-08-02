import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "binkus_the_all_knowing",
	name: "Binkus the All Knowing",
	portrait: "enemies/dungeon/binkus_the_all_knowing.png",
	rank: "boss",
	threat: 25,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 16,
		intelligence: 24,
		wisdom: 18,
		charisma: 16,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 21,
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
			name: "Staff of the Archmage",
			attackAttribute: "strength",
			damage: {
				dice: "2d6+1",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: [
			"finger_of_death",
			"globe_of_invulnerability",
			"chain_lightning",
			"dragon_breath",
			"pierce_magic",
			"binkus_deathray",
		],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom", "charisma"],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
