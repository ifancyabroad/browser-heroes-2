import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "living_mold",
	name: "Living Mold",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkbQX-i_HQ7Gt2qHgm?alt=media&token=a269a32a-249f-494f-9674-f0eddcdaa190",
	boss: false,
	challenge: 8,
	zone: "forest",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: 0,
		fire: -100,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 0,
		radiant: 0,
		slashing: 0,
	},
	skills: ["attack", "regeneration", "poison_bite"],
	stats: {
		charisma: 5,
		constitution: 14,
		dexterity: 8,
		intelligence: 5,
		strength: 12,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 8,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "piercing",
});
