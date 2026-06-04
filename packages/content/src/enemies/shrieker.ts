import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "shrieker",
	name: "Shrieker",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTl1sgx8KyoiRbtpyg?alt=media&token=98536318-247f-4573-9955-b9e4219d9614",
	boss: false,
	challenge: 6,
	zone: "forest",
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
	skills: ["attack", "evasion", "deafening_screech"],
	stats: {
		charisma: 5,
		constitution: 10,
		dexterity: 10,
		intelligence: 2,
		strength: 12,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 6,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "piercing",
});
