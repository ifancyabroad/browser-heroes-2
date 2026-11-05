import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "elf_scout",
	name: "Elf Scout",
	shortName: "Scout",
	description:
		"An elven bowman who watches the paths beyond the grove's borders. Small marks cut into the bark carry reports that outsiders rarely notice.",
	portrait: "enemies/grove/elf_scout.png",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 12,
		dexterity: 18,
		constitution: 12,
		intelligence: 12,
		wisdom: 14,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		initiative: 12,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "ranged",
			name: "Superior Longbow",
			icon: "items/weapons/bows/Bow_03.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d8+2",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["take_aim", "trip_wire"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity"],
	},
	encounter: {
		zone: "grove",
		weight: 1,
	},
	tags: [],
});
