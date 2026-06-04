import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "guard",
	name: "Guard",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-HCKu2YgmZ2jK6vJM?alt=media&token=b2b4c1e6-b61b-4d69-b57d-a4da75e1b65a",
	boss: false,
	challenge: 9,
	zone: "castle",
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
	skills: ["attack", "cripple", "take_aim"],
	stats: {
		charisma: 10,
		constitution: 12,
		dexterity: 14,
		intelligence: 10,
		strength: 10,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 10,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-Nm2AhkGYoZ3Qw0JaJfd",
		hand1: "-NgK0I2STX7An8WjEeUN",
		head: "-NgJyJCDG-1UEccRymvT",
	},
});
