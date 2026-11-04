import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "elf_ranger",
	name: "Elf Ranger",
	description:
		"A veteran hunter whose arrows carry the pale blessing of the stars. The oldest boundary stones bear the names of rangers who never returned.",
	portrait: "enemies/grove/elf_ranger.png",
	rank: "normal",
	threat: 18,
	attributes: {
		strength: 12,
		dexterity: 20,
		constitution: 14,
		intelligence: 12,
		wisdom: 16,
		charisma: 12,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 17,
		initiative: 15,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "ranged",
			name: "Superior Longbow",
			icon: "items/weapons/bows/Bow_10.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d8+2",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["hunterss_mark", "precision_shot"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "wisdom"],
	},
	encounter: {
		zone: "grove",
		weight: 1,
	},
	tags: [],
});
