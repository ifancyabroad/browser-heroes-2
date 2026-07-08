import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "void_creeper",
	name: "Void Creeper",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dNPoAEQhZpCpSnOye?alt=media&token=3aef2883-32c4-48ac-9eeb-b27138ccb665",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 9,
		dexterity: 14,
		constitution: 16,
		intelligence: 20,
		wisdom: 18,
		charisma: 13,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 16,
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
		skillIds: ["cone_of_cold", "drain_life", "psionic_blast"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
