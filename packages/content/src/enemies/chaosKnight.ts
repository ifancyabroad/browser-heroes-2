import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "chaos_knight",
	name: "Chaos Knight",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC8tNczeWUPU9bCX5o4?alt=media&token=49c6b657-5da0-4639-931b-12b9dd50d725",
	rank: "normal",
	level: 17,
	threat: 17,
	attributes: {
		strength: 20,
		dexterity: 18,
		constitution: 20,
		intelligence: 10,
		wisdom: 14,
		charisma: 14,
	},
	combat: {
		maxHp: 180,
		armourClass: 18,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 11,
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["disarm", "focus_energy", "whirlwind_strike"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
