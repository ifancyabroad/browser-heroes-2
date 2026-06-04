import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "fire_drake",
	name: "Fire Drake",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkeXYbGnQ67kC7gWyw?alt=media&token=e1a3bff8-36b5-4df4-abef-870060c3b0aa",
	boss: false,
	challenge: 17,
	zone: "volcano",
	resistances: {
		acid: 0,
		cold: -50,
		crushing: 0,
		fire: 50,
		lightning: 50,
		necrotic: 0,
		piercing: 0,
		poison: 0,
		radiant: 0,
		slashing: 0,
	},
	skills: ["attack", "fire_breath", "drop_from_above"],
	stats: {
		charisma: 19,
		constitution: 18,
		dexterity: 13,
		intelligence: 14,
		strength: 21,
		wisdom: 11,
	},
	tactics: "default",
	naturalArmourClass: 15,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "piercing",
});
