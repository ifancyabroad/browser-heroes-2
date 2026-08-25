import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ghoul",
	name: "Ghoul",
	portrait: "enemies/hills/ghoul.png",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 13,
		dexterity: 15,
		constitution: 10,
		intelligence: 7,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 12,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Claws",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "slashing",
				damageClass: "physical",
				attribute: "dexterity",
			},
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "applyStatus",
							target: "enemy",
							statusId: "stunned",
							duration: { unit: "turns", value: 1 },
							save: {
								attribute: "constitution",
								onSuccess: "noEffect",
								dc: { attribute: "constitution" },
							},
						},
					],
				},
			],
		},
		skillIds: [],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
