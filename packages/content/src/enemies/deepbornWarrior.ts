import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "deepborn_warrior",
	name: "Deepborn Warrior",
	description:
		"An armoured Deepborn sworn to defend the temple's inner passages. His company guards sealed doors whose contents are known only to the priesthood.",
	portrait: "enemies/temple/deepborn_warrior.png",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 16,
		dexterity: 14,
		constitution: 16,
		intelligence: 14,
		wisdom: 12,
		charisma: 12,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 16,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Superior Handaxe",
			icon: "items/weapons/axes/Axe_03.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6+2",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["cleave", "unholy_strike"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "temple",
		weight: 1,
	},
	tags: [],
});
