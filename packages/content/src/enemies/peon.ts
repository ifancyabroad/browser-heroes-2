import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "peon",
	name: "Peon",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-fMuqrOuFGLmOM7kj?alt=media&token=0020019a-77c4-43ea-bf02-350d5abcdb86",
	rank: "normal",
	level: 10,
	threat: 10,
	attributes: {
		strength: 16,
		dexterity: 12,
		constitution: 16,
		intelligence: 7,
		wisdom: 11,
		charisma: 10,
	},
	combat: {
		hitDice: "10d8+45",
		armourClass: 13,
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
				skillId: "heavy_strike",
				rank: 1,
			},
		],
		featIds: [],
		tactic: "default",
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
