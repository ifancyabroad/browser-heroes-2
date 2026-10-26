import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "elf_kingsblade",
	name: "Elf Kingsblade",
	description:
		"A royal swordsman trained to break an enemy's defence with measured, powerful cuts. Admission to the order requires surrendering every claim to a family inheritance.",
	portrait: "enemies/grove/07.PNG",
	rank: "normal",
	threat: 20,
	attributes: {
		strength: 18,
		dexterity: 18,
		constitution: 14,
		intelligence: 12,
		wisdom: 14,
		charisma: 12,
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
			name: "Superior Greatsword",
			icon: "items/weapons/swords/Sword_11.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d6+2",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "focus_energy"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "grove",
		weight: 1,
	},
	tags: [],
});
