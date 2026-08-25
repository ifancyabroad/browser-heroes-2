import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "pit_fiend_yagamon",
	name: "Pit Fiend Yagamon",
	portrait: "enemies/volcano/pit_fiend_yagamon.png",
	rank: "boss",
	threat: 26,
	attributes: {
		strength: 26,
		dexterity: 14,
		constitution: 24,
		intelligence: 22,
		wisdom: 18,
		charisma: 24,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 20,
		damageAffinities: {
			resistances: ["acid", "cold", "crushing", "lightning", "piercing", "slashing"],
			immunities: ["fire", "poison"],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Slam",
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
							damageType: "fire",
							damageClass: "magical",
							dice: "2d6",
						},
					],
				},
			],
		},
		skillIds: ["double_strike", "fireball", "yagamons_revenge"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution", "wisdom", "charisma"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
