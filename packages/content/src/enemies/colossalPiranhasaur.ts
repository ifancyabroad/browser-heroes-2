import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "colossal_piranhasaur",
	name: "Colossal Piranhasaur",
	description:
		"An immense piranhasaur that uses brute strength to claim the richest coastal hunting grounds. Smaller kin surrender their catches before becoming part of the meal.",
	portrait: "enemies/ocean/colossal_piranhasaur.png",
	rank: "normal",
	threat: 19,
	attributes: {
		strength: 22,
		dexterity: 10,
		constitution: 20,
		intelligence: 6,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 16,
		damageAffinities: {
			resistances: ["cold"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Claws",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d8",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["knock_down", "double_strike", "powerful_blow"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
