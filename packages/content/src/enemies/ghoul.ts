import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ghoul",
	name: "Ghoul",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgT_UhmZUanGpfiYwvB?alt=media&token=1382fd96-b9af-43da-ba47-cf0bfc802347",
	rank: "normal",
	level: 11,
	threat: 11,
	attributes: {
		strength: 13,
		dexterity: 15,
		constitution: 10,
		intelligence: 7,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		maxHp: 65,
		armourClass: 12,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 5,
			damage: {
				dice: "1d6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["ghoul_strike"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
