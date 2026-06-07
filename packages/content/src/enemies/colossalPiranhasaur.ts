import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "colossal_piranhasaur",
	name: "Colossal Piranhasaur",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dU8gwThi8fYltU0PV?alt=media&token=4a2a8b62-d2a5-4acc-8b5c-674d2f1c9fca",
	rank: "normal",
	level: 16,
	threat: 16,
	attributes: {
		strength: 22,
		dexterity: 10,
		constitution: 20,
		intelligence: 6,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		maxHp: 170,
		armourClass: 16,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: ["cold"],
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
		skillIds: ["knock_down", "double_strike", "powerful_blow"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
