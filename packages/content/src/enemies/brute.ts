import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "brute",
	name: "Brute",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-InhmXpZQgctzSV16?alt=media&token=38e5cadb-8e81-4c12-ac79-2d46f5a4ea7e",
	rank: "normal",
	level: 12,
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
		hitDice: "12d8+52",
		armourClass: 10,
		proficiencyBonus: 4,
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
		skills: [
			{
				skillId: "stand_ground",
				rank: 2,
			},
			{
				skillId: "focus_energy",
				rank: 2,
			},
		],
		featIds: [],
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
