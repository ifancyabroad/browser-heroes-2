import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "binkus_the_all_knowing",
	name: "Binkus the All Knowing",
	portrait: "enemies/dungeon/binkus_the_all_knowing.png",
	rank: "boss",
	threat: 29,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 16,
		intelligence: 24,
		wisdom: 18,
		charisma: 16,
	},
	combat: {
		hitDie: "1d10",
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
			attackRange: "melee",
			name: "Staff of the Archmage",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d8+4",
				type: "lightning",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: [
			"globe_of_invulnerability",
			"chain_lightning",
			"dragon_breath",
			"piercing_magic",
			"binkus_deathray",
			"embrace_elements",
		],
		featIds: [],
		tactic: "binkus",
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
