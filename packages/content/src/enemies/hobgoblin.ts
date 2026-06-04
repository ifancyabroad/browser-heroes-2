import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "hobgoblin",
	name: "Hobgoblin",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTNI7tNRD7gPFbOyq-?alt=media&token=4b588556-067e-4192-919e-3f097f498307",
	boss: false,
	challenge: 9,
	zone: "forest",
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
	skills: ["attack", "acrobatic_strike", "cripple"],
	stats: {
		charisma: 9,
		constitution: 12,
		dexterity: 12,
		intelligence: 10,
		strength: 13,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-Nm2AhkGYoZ3Qw0JaJfd",
		hand1: "-NgK0I2STX7An8WjEeUN",
	},
});
