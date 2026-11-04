import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "mana_bug",
	name: "Mana Bug",
	description:
		"An island beetle that stores stray magic beneath a translucent shell. It gathers around old enchantments, leaving abandoned wards dangerously depleted.",
	portrait: "enemies/island/mana_bug.png",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 6,
		dexterity: 10,
		constitution: 14,
		intelligence: 2,
		wisdom: 7,
		charisma: 3,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 13,
		initiative: 9,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Mandibles",
			icon: "skills/common/bite.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["mana_burst"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "island",
		weight: 1,
	},
	tags: [],
});
