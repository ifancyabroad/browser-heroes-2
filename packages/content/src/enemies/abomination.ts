import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "abomination",
	name: "Abomination",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NKt3ujmy2tXghwqSM9o?alt=media&token=523b97cb-dd08-4c3c-a1dd-e44f82e0fc54",
	rank: "normal",
	level: 15,
	threat: 15,
	attributes: {
		strength: 20,
		dexterity: 10,
		constitution: 18,
		intelligence: 3,
		wisdom: 6,
		charisma: 5,
	},
	combat: {
		maxHp: 145,
		armourClass: 14,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 10,
			damage: {
				dice: "2d4+2",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "corrupted_arm", "skull_bash"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
