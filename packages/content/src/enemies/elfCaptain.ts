import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "elf_captain",
	name: "Elf Captain",
	description:
		"An officer entrusted with the grove's spear companies and border defences. Her authority is renewed each spring before the elders and the royal court.",
	portrait: "enemies/grove/elf_captain.png",
	rank: "normal",
	threat: 18,
	attributes: {
		strength: 16,
		dexterity: 18,
		constitution: 14,
		intelligence: 14,
		wisdom: 16,
		charisma: 16,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 19,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Superior Spear",
			icon: "items/weapons/spears/Spear_24.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+2",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["rallying_cry", "armour_break", "shield_wall"],
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
