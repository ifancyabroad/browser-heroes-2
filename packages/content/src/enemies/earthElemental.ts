import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "earth_elemental",
	name: "Earth Elemental",
	portrait: "enemies/tower/earth_elemental.png",
	rank: "normal",
	threat: 27,
	attributes: {
		strength: 22,
		dexterity: 8,
		constitution: 20,
		intelligence: 6,
		wisdom: 12,
		charisma: 5,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 18,
		damageAffinities: {
			resistances: ["acid", "cold", "crushing", "fire", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["lightning"],
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
		skillIds: ["double_strike", "earthquake", "obliterate"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
