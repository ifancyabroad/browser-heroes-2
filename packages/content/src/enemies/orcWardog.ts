import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_wardog",
	name: "Orc Wardog",
	portrait: "enemies/plains/orc_wardog.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 18,
		dexterity: 16,
		constitution: 18,
		intelligence: 10,
		wisdom: 12,
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
		skillIds: ["charge", "berserk", "leap_attack"],
		featIds: [],
		tactic: "aggressive",
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
