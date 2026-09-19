import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "assassin_of_rit_chi",
	name: "Assassin of Rit Chi",
	description:
		"A devoted killer of Rit Chi’s cult, trained to strike swiftly with paired blades. The priesthood sends one when a rival’s influence outgrows its patience.",
	portrait: "enemies/desert/assassin_of_rit_chi.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 12,
		dexterity: 18,
		constitution: 14,
		intelligence: 10,
		wisdom: 12,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Twin Daggers",
			icon: "items/weapons/daggers/Dagger_02.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "2d4+1",
				type: "piercing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["acrobatic_strike", "evasion"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity", "intelligence"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
