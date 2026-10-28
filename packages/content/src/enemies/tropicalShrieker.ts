import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "tropical_shrieker",
	name: "Tropical Shrieker",
	description:
		"A brightly feathered predator whose piercing calls disrupt the concentration of nearby intruders. Island hunters recognise its nesting grounds by the sudden silence of smaller birds.",
	portrait: "enemies/island/tropical_shrieker.png",
	rank: "normal",
	threat: 11,
	attributes: {
		strength: 12,
		dexterity: 16,
		constitution: 12,
		intelligence: 2,
		wisdom: 12,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Beak",
			icon: "skills/common/bite.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["deafening_screech", "evasion"],
		featIds: [],
		tactic: "aggressive",
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
