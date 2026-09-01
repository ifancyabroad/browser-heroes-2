import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "runtling",
	name: "Runtling",
	portrait: "enemies/forest/runtling.png",
	rank: "normal",
	threat: 8,
	attributes: {
		strength: 8,
		dexterity: 13,
		constitution: 9,
		intelligence: 10,
		wisdom: 8,
		charisma: 8,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Bite",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damage",
							target: "enemy",
							damageType: "acid",
							damageClass: "other",
							dice: "1d4",
						},
					],
				},
			],
		},
		skillIds: ["charge"],
		featIds: [],
		tactic: "aggressive",
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
