import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_catapult",
	name: "Orc Catapult",
	portrait: "enemies/plains/orc_catapult.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 20,
		dexterity: 14,
		constitution: 16,
		intelligence: 10,
		wisdom: 10,
		charisma: 5,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 15,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			attackRange: "ranged",
			name: "Catapult Shot",
			attackAttribute: "strength",
			damage: {
				dice: "1d12+1",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["reposition", "head_shot"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
