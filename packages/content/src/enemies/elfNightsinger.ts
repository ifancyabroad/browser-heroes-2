import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "elf_nightsinger",
	name: "Elf Nightsinger",
	description:
		"An elven assassin who slips through the grove's outer settlements with paired blades. The court records those she kills as having departed before dawn.",
	portrait: "enemies/grove/01.PNG",
	rank: "normal",
	threat: 19,
	attributes: {
		strength: 12,
		dexterity: 20,
		constitution: 14,
		intelligence: 14,
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
			name: "Superior Twin Daggers",
			icon: "items/weapons/daggers/Dagger_02.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "2d4+2",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["acrobatic_strike", "cripple", "evasion"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "intelligence"],
	},
	encounter: {
		zone: "grove",
		weight: 1,
	},
	tags: [],
});
