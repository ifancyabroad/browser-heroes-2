import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ice_elemental",
	name: "Ice Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9RSTcdzO5pmuTfjSM?alt=media&token=e7f747be-4aeb-4e67-ba18-2cbde44ffdb5",
	boss: false,
	challenge: 20,
	zone: "tower",
	resistances: {
		acid: 25,
		cold: 100,
		crushing: 25,
		fire: -50,
		lightning: 25,
		necrotic: 0,
		piercing: 25,
		poison: 100,
		radiant: 0,
		slashing: 25,
	},
	skills: ["attack", "double_strike", "ice_punch"],
	stats: {
		charisma: 11,
		constitution: 19,
		dexterity: 18,
		intelligence: 8,
		strength: 24,
		wisdom: 11,
	},
	tactics: "default",
	naturalArmourClass: 20,
	naturalMinDamage: 7,
	naturalMaxDamage: 14,
	naturalDamageType: "cold",
});
