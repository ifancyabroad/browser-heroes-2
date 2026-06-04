import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "fire_elemental",
	name: "Fire Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9R-HzyJPG_LQJmkym?alt=media&token=2a7ee4c5-a919-44f8-80e8-ca931bb2e545",
	boss: false,
	challenge: 16,
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
	skills: ["attack", "double_strike", "burning_rampage"],
	stats: {
		charisma: 7,
		constitution: 18,
		dexterity: 19,
		intelligence: 8,
		strength: 12,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 14,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "fire",
});
