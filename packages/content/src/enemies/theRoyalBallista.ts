import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_royal_ballista",
	name: "The Royal Ballista",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-V5qou-xrOAQnh3Qm?alt=media&token=bbf8f1c8-9e5a-4df0-aa9f-71dba245b771",
	boss: true,
	challenge: 15,
	zone: "castle",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: 0,
		fire: -50,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 100,
		radiant: 0,
		slashing: 0,
	},
	skills: ["attack", "multi_shot", "reposition", "burning_shot"],
	stats: {
		charisma: 10,
		constitution: 16,
		dexterity: 12,
		intelligence: 10,
		strength: 18,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 15,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "piercing",
});
