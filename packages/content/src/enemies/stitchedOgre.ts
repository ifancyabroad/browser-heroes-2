import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "stitched_ogre",
	name: "Stitched Ogre",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NKt0FqDCM_Ms7YFjWhj?alt=media&token=3eadfc3b-9be7-46d3-ae83-2e76394cd478",
	boss: false,
	challenge: 16,
	zone: "hills",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: 0,
		fire: 0,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 100,
		radiant: -50,
		slashing: 0,
	},
	skills: ["attack", "flurry", "expose_weakness", "shadow_strike"],
	stats: {
		charisma: 5,
		constitution: 16,
		dexterity: 16,
		intelligence: 3,
		strength: 19,
		wisdom: 6,
	},
	tactics: "default",
	naturalArmourClass: 14,
	naturalMinDamage: 1,
	naturalMaxDamage: 8,
	naturalDamageType: "piercing",
});
