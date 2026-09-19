import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "chomper",
	name: "Chomper",
	description:
		"A carnivorous plant that subdues prey with a poisonous bite. It thrives beside busy trails, where fertiliser delivers itself.",
	portrait: "enemies/forest/chomper.png",
	rank: "normal",
	threat: 9,
	attributes: {
		strength: 12,
		dexterity: 14,
		constitution: 10,
		intelligence: 2,
		wisdom: 11,
		charisma: 4,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Bite",
			icon: "skills/common/bite.png",
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
		skillIds: ["growth"],
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
