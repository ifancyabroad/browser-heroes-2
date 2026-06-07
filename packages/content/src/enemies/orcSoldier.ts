import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_soldier",
	name: "Orc Soldier",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-lBa51MudTHTCLF5t?alt=media&token=85410942-b208-4a70-91d1-e00dd54e15cc",
	rank: "normal",
	level: 13,
	threat: 13,
	attributes: {
		strength: 18,
		dexterity: 14,
		constitution: 16,
		intelligence: 7,
		wisdom: 11,
		charisma: 10,
	},
	combat: {
		maxHp: 114,
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
			attackBonus: 9,
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["heavy_strike", "rend", "armour_break"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
