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
		maxHp: 90,
		armourClass: 13,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 7,
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["heavy_strike"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
