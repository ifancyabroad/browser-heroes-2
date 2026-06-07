import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "pit_fiend_yagamon",
	name: "Pit Fiend Yagamon",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O1g5UbnObhA-7IMjEhj?alt=media&token=607165fd-970a-42c7-909c-0c366825351e",
	rank: "boss",
	level: 22,
	threat: 22,
	attributes: {
		strength: 26,
		dexterity: 14,
		constitution: 24,
		intelligence: 22,
		wisdom: 18,
		charisma: 24,
	},
	combat: {
		maxHp: 428,
		armourClass: 20,
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
			attackBonus: 15,
			damage: {
				dice: "2d4+4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "fireball", "fire_strike", "yagamon_s_revenge"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
