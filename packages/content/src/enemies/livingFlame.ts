import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "living_flame",
	name: "Living Flame",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkcuvakLcMmPpk-jQk?alt=media&token=f3e0a550-50df-44ed-afea-cc7783541eca",
	boss: false,
	challenge: 18,
	zone: "volcano",
	resistances: {
		acid: 0,
		cold: -50,
		crushing: 0,
		fire: 100,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 100,
		radiant: 0,
		slashing: 0,
	},
	skills: ["attack", "engulf", "fireball", "pierce_magic", "embrace_elements"],
	stats: {
		charisma: 14,
		constitution: 16,
		dexterity: 14,
		intelligence: 20,
		strength: 9,
		wisdom: 16,
	},
	tactics: "caster",
	naturalArmourClass: 16,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "fire",
});
