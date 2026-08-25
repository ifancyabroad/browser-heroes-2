import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ice_elemental",
	name: "Ice Elemental",
	portrait: "enemies/tower/ice_elemental.png",
	rank: "normal",
	threat: 28,
	attributes: {
		strength: 24,
		dexterity: 18,
		constitution: 19,
		intelligence: 8,
		wisdom: 11,
		charisma: 11,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 20,
		damageAffinities: {
			resistances: ["acid", "crushing", "lightning", "piercing", "slashing"],
			immunities: ["cold", "poison"],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Freezing Touch",
			attackAttribute: "strength",
			damage: {
				dice: "2d8",
				type: "cold",
				damageClass: "magical",
				attribute: "strength",
			},
			attackRiders: [
				{
					timing: "onHit",
					effects: [
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
		skillIds: ["double_strike"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
