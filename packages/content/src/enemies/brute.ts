import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "brute",
	name: "Brute",
	portrait: "enemies/castle/brute.png",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 14,
		dexterity: 14,
		constitution: 16,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Flail",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["stand_ground"],
		featIds: ["focus_energy"],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["strength"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
