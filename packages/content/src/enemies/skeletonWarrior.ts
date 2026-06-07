import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "skeleton_warrior",
	name: "Skeleton Warrior",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NKt0uevyBhRIvkURXy4?alt=media&token=0bfa0d86-13d7-40b7-abae-50214d4ed2ee",
	rank: "normal",
	level: 9,
	threat: 9,
	attributes: {
		strength: 12,
		dexterity: 14,
		constitution: 15,
		intelligence: 7,
		wisdom: 8,
		charisma: 5,
	},
	combat: {
		maxHp: 73,
		armourClass: 13,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["crushing", "radiant"],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 5,
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["rend", "cleave"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
