import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "assassin_of_rit_chi",
	name: "Assassin of Rit Chi",
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
