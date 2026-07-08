import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wretch",
	name: "Wretch",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC8uEK4XtBh_Py9ba4-?alt=media&token=07baeee7-7023-4e42-ac14-627dd5139d2e",
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
		tactic: "default",
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
