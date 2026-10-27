import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "island_06",
	name: "Island Enemy 06",
	description: "Placeholder enemy. Replace the name, description, stats, and abilities.",
	portrait: "enemies/island/06.PNG",
	rank: "normal",
	threat: 1,
	attributes: {
		strength: 10,
		dexterity: 10,
		constitution: 10,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
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
			name: "Basic Attack",
			icon: "items/weapons/hammers/Hammer_21.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "crushing",
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
		zone: "island",
		weight: 1,
	},
	tags: [],
});
