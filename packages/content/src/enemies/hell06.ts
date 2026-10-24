import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "hell_06",
	name: "Hell Enemy 06",
	description:
		"Placeholder enemy. Replace the name, description, stats, and abilities before enabling this zone.",
	portrait: "enemies/hell/D_06.png",
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
		zone: "hell",
		weight: 1,
	},
	tags: [],
});
