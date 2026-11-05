import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "elf_spearman",
	name: "Elf Spearman",
	description:
		"A trained soldier who holds the narrow approaches between the ancient trees. His company still practises formations devised for wars remembered only by the elves.",
	portrait: "enemies/grove/elf_spearman.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 16,
		dexterity: 16,
		constitution: 14,
		intelligence: 12,
		wisdom: 14,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 17,
		initiative: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Superior Spear",
			icon: "items/weapons/spears/Spear_24.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+2",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["stand_ground", "armour_break"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength"],
	},
	encounter: {
		zone: "grove",
		weight: 1,
	},
	tags: [],
});
