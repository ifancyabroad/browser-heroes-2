import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "elf_nightsinger",
	name: "Elf Nightsinger",
	description:
		"An elven assassin who slips through the grove's outer settlements with paired blades. The court records those she kills as having departed before dawn.",
	portrait: "enemies/grove/elf_nightsinger.png",
	rank: "normal",
	threat: 18,
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
		skillIds: ["deadly_throw", "shadowmeld", "evasion"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity"],
	},
	encounter: {
		zone: "grove",
		weight: 1,
	},
	tags: [],
});
