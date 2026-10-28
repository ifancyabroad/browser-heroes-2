import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bile_demon",
	name: "Bile Demon",
	description:
		"A swollen fiend whose corrosive secretions foul the ground beneath its feet. Infernal armies drive it ahead of their baggage trains to clear contested passages.",
	portrait: "enemies/hell/bile_demon.png",
	rank: "normal",
	threat: 25,
	attributes: {
		strength: 20,
		dexterity: 10,
		constitution: 22,
		intelligence: 5,
		wisdom: 12,
		charisma: 12,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 16,
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
			name: "Slam",
			icon: "skills/common/punch.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d8",
				type: "crushing",
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
							damageType: "acid",
							damageClass: "other",
							dice: "1d6",
						},
					],
				},
			],
		},
		skillIds: ["poison_cloud", "powerful_blow", "skull_bash"],
		featIds: [],
		tactic: "aggressive",
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
