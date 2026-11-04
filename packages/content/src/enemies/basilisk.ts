import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "basilisk",
	name: "Basilisk",
	description:
		"A venomous reptile whose gaze turns living flesh to stone. The lifelike figures along the mountain paths serve as warnings to those still able to turn back.",
	portrait: "enemies/volcano/basilisk.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 15,
		dexterity: 13,
		constitution: 13,
		intelligence: 2,
		wisdom: 10,
		charisma: 3,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		initiative: 10,
		damageAffinities: {
			resistances: ["fire"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Bite",
			icon: "skills/common/bite.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
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
							dice: "3d4",
							save: {
								attribute: "constitution",
								onSuccess: "halfDamage",
								dc: { attribute: "constitution" },
							},
						},
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "poison",
							damageClass: "other",
							dice: "2d4",
							duration: { unit: "turns", value: 4 },
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
		skillIds: ["petrifying_gaze", "leap_attack", "toxic_spit"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
