import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "quasit",
	name: "Quasit",
	description:
		"A winged scavenger whose claws carry venom and whose presence unsettles the mind. Greater fiends employ it to spy on rivals and torment prisoners.",
	portrait: "enemies/hell/D_02.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 5,
		dexterity: 17,
		constitution: 10,
		intelligence: 7,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 13,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Claws",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d4",
				type: "slashing",
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
							damageType: "poison",
							damageClass: "other",
							dice: "2d4",
							save: {
								attribute: "constitution",
								onSuccess: "halfDamage",
								dc: {
									attribute: "constitution",
								},
							},
						},
					],
				},
			],
		},
		skillIds: ["poison_claw", "spook", "shadowmeld"],
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
