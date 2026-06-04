import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "dracolich",
	name: "Dracolich",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9OF2HqGp-rpiUO0C6?alt=media&token=9049c523-27b1-440e-9787-d1b62f46a859",
	boss: false,
	challenge: 20,
	zone: "dungeon",
	resistances: {
		acid: 25,
		cold: 25,
		crushing: -50,
		fire: 25,
		lightning: 25,
		necrotic: 50,
		piercing: 25,
		poison: 100,
		radiant: -50,
		slashing: 25,
	},
	skills: ["attack", "tail_swipe", "double_strike", "necro_breath", "dragon_focus"],
	stats: {
		charisma: 20,
		constitution: 18,
		dexterity: 14,
		intelligence: 16,
		strength: 22,
		wisdom: 14,
	},
	tactics: "default",
	naturalArmourClass: 18,
	naturalMinDamage: 7,
	naturalMaxDamage: 14,
	naturalDamageType: "slashing",
});
