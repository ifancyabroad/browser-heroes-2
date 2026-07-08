import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "brute",
	name: "Brute",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-InhmXpZQgctzSV16?alt=media&token=38e5cadb-8e81-4c12-ac79-2d46f5a4ea7e",
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
		skillIds: ["stand_ground"],
		featIds: ["focus_energy"],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution", "strength"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
