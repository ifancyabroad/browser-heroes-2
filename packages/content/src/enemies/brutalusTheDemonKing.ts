import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "brutalus_the_demon_king",
	name: "Brutalus the Demon King",
	description:
		"A demon king whose authority rests on conquest and the strength to silence challengers. The skulls beneath his throne record the dynasties absorbed into his dominion.",
	portrait: "enemies/hell/brutalus_the_demon_king.png",
	rank: "boss",
	threat: 30,
	attributes: {
		strength: 26,
		dexterity: 14,
		constitution: 24,
		intelligence: 18,
		wisdom: 16,
		charisma: 22,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 22,
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
			name: "Infernal Claws",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d8",
				type: "slashing",
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
		skillIds: ["demonic_pact", "multi_strike", "flame_slam", "inferno"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution", "wisdom", "charisma"],
	},
	encounter: {
		zone: "hell",
		weight: 1,
	},
	tags: [],
});
