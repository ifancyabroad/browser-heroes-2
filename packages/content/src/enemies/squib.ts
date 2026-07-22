import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "squib",
	name: "Squib",
	portrait: "enemies/ocean/squib.png",
	rank: "normal",
	threat: 7,
	attributes: {
		strength: 13,
		dexterity: 10,
		constitution: 11,
		intelligence: 11,
		wisdom: 10,
		charisma: 8,
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
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["doom_song"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
