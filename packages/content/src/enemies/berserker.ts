import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "berserker",
	name: "Berserker",
	portrait: "enemies/castle/berserker.png",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 16,
		dexterity: 12,
		constitution: 14,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 11,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Battleaxe",
			attackAttribute: "strength",
			damage: {
				dice: "1d10",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["armour_break", "berserk", "cleave"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
