import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "elf_kingsblade",
	name: "Elf Kingsblade",
	shortName: "Kingsblade",
	description:
		"A royal swordsman trained to break an enemy's defence with measured, powerful cuts. Admission to the order requires surrendering every claim to a family inheritance.",
	portrait: "enemies/grove/elf_kingsblade.png",
	rank: "normal",
	threat: 18,
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
		initiative: 12,
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
		skillIds: ["dawn_strike", "focus_energy", "dueling_stance"],
		featIds: [],
		tactic: "default",
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
