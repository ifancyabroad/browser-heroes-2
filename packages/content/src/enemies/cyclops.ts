import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "cyclops",
	name: "Cyclops",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4XNLlQk-tb-D9BMAJ?alt=media&token=e1e9e459-1a43-4c74-8c41-57c817289468",
	rank: "normal",
	level: 16,
	threat: 16,
	attributes: {
		strength: 22,
		dexterity: 11,
		constitution: 20,
		intelligence: 8,
		wisdom: 6,
		charisma: 10,
	},
	combat: {
		maxHp: 170,
		armourClass: 14,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 11,
			damage: {
				dice: "2d4+2",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["tenderise", "double_strike"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
