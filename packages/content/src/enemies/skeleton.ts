import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "skeleton",
	name: "Skeleton",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NKszEMMl4YFhX86psew?alt=media&token=31bf00b9-f9c9-4d51-84d5-a1cec41c5392",
	boss: false,
	challenge: 8,
	zone: "hills",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: -50,
		fire: 0,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 100,
		radiant: -50,
		slashing: 0,
	},
	skills: ["attack"],
	stats: {
		charisma: 5,
		constitution: 14,
		dexterity: 13,
		intelligence: 6,
		strength: 10,
		wisdom: 8,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
});
