import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "guard",
	name: "Guard",
	portrait: "enemies/castle/guard.png",
	rank: "normal",
	threat: 9,
	attributes: {
		strength: 10,
		dexterity: 14,
		constitution: 12,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 10,
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
		skillIds: ["cripple", "take_aim"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
