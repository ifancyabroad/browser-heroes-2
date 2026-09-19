import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "worg",
	name: "Worg",
	description:
		"A powerful wolf-like beast tamed to carry supplies through the forest. Its handlers feed it well and trust it sparingly.",
	portrait: "enemies/forest/worg.png",
	rank: "normal",
	threat: 6,
	attributes: {
		strength: 14,
		dexterity: 11,
		constitution: 11,
		intelligence: 7,
		wisdom: 11,
		charisma: 8,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Bite",
			icon: "skills/common/bite.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: [],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
