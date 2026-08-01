import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wretch",
	name: "Wretch",
	portrait: "enemies/dungeon/wretch.png",
	rank: "normal",
	threat: 10,
	attributes: {
		strength: 12,
		dexterity: 16,
		constitution: 12,
		intelligence: 6,
		wisdom: 12,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			name: "Claw",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "slashing",
				attribute: "dexterity",
			},
		},
		skillIds: ["leap_attack"],
		featIds: ["evasion"],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity", "strength"],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
