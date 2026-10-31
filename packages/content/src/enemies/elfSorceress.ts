import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "elf_sorceress",
	name: "Elf Sorceress",
	description:
		"An elven spellcaster who draws destructive power from moonlight and storm. Her order tends the silver pools in which the court reads the changing heavens.",
	portrait: "enemies/grove/elf_sorceress.png",
	rank: "normal",
	threat: 19,
	attributes: {
		strength: 10,
		dexterity: 16,
		constitution: 14,
		intelligence: 20,
		wisdom: 16,
		charisma: 16,
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
			name: "Superior Moonstaff",
			icon: "items/weapons/staves/staff_40.png",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d8+2",
				type: "radiant",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: ["magic_missiles", "sunbeam", "mana_shield"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence"],
	},
	encounter: {
		zone: "grove",
		weight: 1,
	},
	tags: [],
});
