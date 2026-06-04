import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_archer",
	name: "Ratman Archer",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_P6i6e4r31C74MN_B?alt=media&token=35159584-c7d9-4f43-a46e-c5cef815e5f6",
	boss: false,
	challenge: 10,
	zone: "desert",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: 0,
		fire: 0,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 0,
		radiant: 0,
		slashing: 0,
	},
	skills: ["attack", "cripple", "poison_shot"],
	stats: {
		charisma: 6,
		constitution: 12,
		dexterity: 16,
		intelligence: 8,
		strength: 8,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 12,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "slashing",
	equipment: {
		body: "-NMEwPxI9DXom0AaME0Z",
		hand1: "-NgK0I2STX7An8WjEeUN",
	},
});
