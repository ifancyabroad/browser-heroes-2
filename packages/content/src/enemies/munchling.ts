import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "munchling",
	name: "Munchling",
	portrait: "enemies/ocean/munchling.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 14,
		dexterity: 17,
		constitution: 14,
		intelligence: 6,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: ["cold"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "dexterity",
			},
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damage",
							target: "enemy",
							damageType: "cold",
							dice: "1d8",
						},
						{
							type: "modifyRoll",
							target: "enemy",
							roll: "attack",
							mode: "disadvantage",
							duration: { unit: "turns", value: 2 },
							save: {
								attribute: "constitution",
								onSuccess: "noEffect",
								dc: { attribute: "strength" },
							},
						},
					],
				},
			],
		},
		skillIds: ["go_for_the_eyes"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
