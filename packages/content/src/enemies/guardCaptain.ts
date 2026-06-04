import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "guard_captain",
	name: "Guard Captain",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-KDRuLZZFywpQQzVs?alt=media&token=9e410478-e066-4f14-9d0c-5ead734171d5",
	boss: false,
	challenge: 12,
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
	skills: ["attack", "take_aim", "multi_shot"],
	stats: {
		charisma: 10,
		constitution: 14,
		dexterity: 16,
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
		body: "-NMEwPxI9DXom0AaME0Z",
		hand1: "-NgNzkZJ0nG0Iep0uzOb",
		head: "-NgJyJCDG-1UEccRymvT",
	},
});
