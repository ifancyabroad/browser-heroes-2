import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "chomper",
	name: "Chomper",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTNbCiHpz6PPDP3_Qm?alt=media&token=779abe20-411d-4a21-820f-7692aa8dfceb",
	boss: false,
	challenge: 7,
	zone: "forest",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: 0,
		fire: -50,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 0,
		radiant: 0,
		slashing: 0,
	},
	skills: ["attack", "poison_bite", "growth"],
	stats: {
		charisma: 4,
		constitution: 10,
		dexterity: 14,
		intelligence: 2,
		strength: 12,
		wisdom: 11,
	},
	tactics: "default",
	naturalArmourClass: 6,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "piercing",
});
