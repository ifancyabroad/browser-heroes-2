import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "hobgoblin",
	name: "Hobgoblin",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTNI7tNRD7gPFbOyq-?alt=media&token=4b588556-067e-4192-919e-3f097f498307",
	rank: "normal",
	threat: 9,
	attributes: {
		strength: 13,
		dexterity: 12,
		constitution: 12,
		intelligence: 10,
		wisdom: 10,
		charisma: 9,
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
		skillIds: ["cripple"],
		featIds: ["acrobatic_training"],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "dexterity"],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
