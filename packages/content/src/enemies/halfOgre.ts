import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "half_ogre",
	name: "Half Ogre",
	portrait: "enemies/plains/half_ogre.png",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 19,
		dexterity: 12,
		constitution: 16,
		intelligence: 8,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["heavy_strike", "skull_bash"],
		featIds: ["brute_strength"],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
