import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_tracker",
	name: "Orc Tracker",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-hCT0lQo-TZeq1pL2?alt=media&token=3000f79b-487e-473b-90a0-9cf3606dd08d",
	boss: false,
	challenge: 14,
	zone: "plains",
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
	skills: ["attack", "multi_shot", "take_aim", "trip_wire"],
	stats: {
		charisma: 10,
		constitution: 16,
		dexterity: 18,
		intelligence: 10,
		strength: 14,
		wisdom: 11,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		hand1: "-O836Y7Gx_vk9fruIwmR",
	},
});
