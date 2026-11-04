import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "cerberus",
	name: "Cerberus",
	description:
		"A three-headed infernal hound bred to guard the roads between Hell's strongholds. Its keepers recognise each head's voice and know which heralds approaching prey.",
	portrait: "enemies/hell/cerberus.png",
	rank: "normal",
	threat: 24,
	attributes: {
		strength: 17,
		dexterity: 12,
		constitution: 14,
		intelligence: 6,
		wisdom: 13,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		initiative: 10,
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
			name: "Bite",
			icon: "skills/common/bite.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
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
							damageType: "fire",
							damageClass: "magical",
							dice: "2d6",
						},
					],
				},
			],
		},
		skillIds: ["multi_strike", "fire_breath", "detect_blood"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "hell",
		weight: 1,
	},
	tags: [],
});
