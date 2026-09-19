import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "chaos_knight",
	name: "Chaos Knight",
	description:
		"An armoured swordsman strengthened by a pact with chaos. He seeks worthy opponents in the dungeon, hoping each victory will earn another favour from his patron.",
	portrait: "enemies/dungeon/chaos_knight.png",
	rank: "normal",
	threat: 25,
	attributes: {
		strength: 20,
		dexterity: 18,
		constitution: 20,
		intelligence: 10,
		wisdom: 14,
		charisma: 14,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 19,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Masterwork Greatsword",
			icon: "items/weapons/swords/Sword_64.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d6+4",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["focus_energy", "whirlwind_strike"],
		featIds: [],
		tactic: "random",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "charisma"],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
