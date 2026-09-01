import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "living_mold",
	name: "Living Mold",
	portrait: "enemies/forest/living_mold.png",
	rank: "normal",
	threat: 7,
	attributes: {
		strength: 12,
		dexterity: 8,
		constitution: 14,
		intelligence: 5,
		wisdom: 10,
		charisma: 5,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 9,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "acid",
				damageClass: "other",
				attribute: "strength",
			},
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "poison",
							damageClass: "other",
							dice: "1d4",
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
		skillIds: ["regeneration"],
		featIds: [],
		tactic: "defensive",
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
