import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "priest_of_ogmunsta",
	name: "Priest of Og'munsta",
	description:
		"A plated servant of Og'munsta who draws vitality from the temple's enemies. Each stolen life is offered towards awakening the presence beyond its sealed sanctuary.",
	portrait: "enemies/temple/priest_of_ogmunsta.png",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 14,
		dexterity: 12,
		constitution: 16,
		intelligence: 16,
		wisdom: 18,
		charisma: 16,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 17,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Claws",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["inflict_wounds", "drain_life", "power_word_shield"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["wisdom", "charisma"],
	},
	encounter: {
		zone: "temple",
		weight: 1,
	},
	tags: [],
});
