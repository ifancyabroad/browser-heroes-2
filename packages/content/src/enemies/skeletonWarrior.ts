import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "skeleton_warrior",
	name: "Skeleton Warrior",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NKt0uevyBhRIvkURXy4?alt=media&token=0bfa0d86-13d7-40b7-abae-50214d4ed2ee",
	boss: false,
	challenge: 9,
	zone: "hills",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: -50,
		fire: 0,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 100,
		radiant: -50,
		slashing: 0,
	},
	skills: ["attack", "rend", "cleave"],
	stats: {
		charisma: 5,
		constitution: 15,
		dexterity: 14,
		intelligence: 7,
		strength: 12,
		wisdom: 8,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-NMEwPxI9DXom0AaME0Z",
		hand1: "-NgK-VVeMfZnyRzNuNyK",
		hand2: "-NgJzNDx7O2sLwCLS8rd",
	},
});
