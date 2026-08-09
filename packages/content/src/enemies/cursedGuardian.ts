import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "cursed_guardian",
	name: "Cursed Guardian",
	portrait: "enemies/abyss/cursed_guardian.png",
	rank: "normal",
	threat: 24,
	attributes: {
		strength: 22,
		dexterity: 14,
		constitution: 21,
		intelligence: 5,
		wisdom: 10,
		charisma: 13,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 18,
		damageAffinities: {
			resistances: ["acid", "cold", "crushing", "fire", "lightning", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "2d8",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["obliterate", "devour_soul", "double_strike"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "wisdom"],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
