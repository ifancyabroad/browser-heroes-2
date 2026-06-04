import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "magma_elemental",
	name: "Magma Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9T0NsJFrfYHqxt1nI?alt=media&token=4218dd9a-94df-4def-a67c-fc3378c273f9",
	boss: false,
	challenge: 19,
	zone: "tower",
	resistances: {
		acid: 25,
		cold: -50,
		crushing: 25,
		fire: 100,
		lightning: 25,
		necrotic: 0,
		piercing: 25,
		poison: 100,
		radiant: 0,
		slashing: 25,
	},
	skills: ["attack", "double_strike", "molten_overdrive", "flame_slam"],
	stats: {
		charisma: 11,
		constitution: 19,
		dexterity: 8,
		intelligence: 8,
		strength: 24,
		wisdom: 11,
	},
	tactics: "default",
	naturalArmourClass: 19,
	naturalMinDamage: 7,
	naturalMaxDamage: 14,
	naturalDamageType: "crushing",
});
