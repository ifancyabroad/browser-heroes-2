import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "deepborn_warrior",
	name: "Deepborn Warrior",
	description:
		"An armoured Deepborn sworn to defend the temple's inner passages. His company guards sealed doors whose contents are known only to the priesthood.",
	portrait: "enemies/temple/04.PNG",
	rank: "normal",
	threat: 15,
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
		armourClass: 18,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Fine Handaxe",
			icon: "items/weapons/axes/Axe_03.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6+1",
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
