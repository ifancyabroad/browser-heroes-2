import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "cyclops",
	name: "Cyclops",
	portrait: "enemies/abyss/cyclops.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 22,
		dexterity: 11,
		constitution: 20,
		intelligence: 8,
		wisdom: 6,
		charisma: 10,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Fine Battleaxe",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+1",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["tenderise", "double_strike"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
