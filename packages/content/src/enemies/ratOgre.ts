import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "rat_ogre",
	name: "Rat Ogre",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_aLIP0OdTe0rGO9QY?alt=media&token=b126fffb-7453-47d4-9f1a-1459344c8036",
	boss: false,
	challenge: 14,
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
	skills: ["attack", "berserk", "heavy_strike"],
	stats: {
		charisma: 6,
		constitution: 18,
		dexterity: 14,
		intelligence: 3,
		strength: 18,
		wisdom: 8,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 8,
	naturalDamageType: "piercing",
});
