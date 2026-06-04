import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "chaos_mauler",
	name: "Chaos Mauler",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC8tEGD00w4BfIFf7hV?alt=media&token=665ddd4f-b11c-424f-b563-fe646fc75542",
	boss: false,
	challenge: 19,
	zone: "dungeon",
	resistances: {
		acid: 25,
		cold: 25,
		crushing: 25,
		fire: 25,
		lightning: 25,
		necrotic: 0,
		piercing: 25,
		poison: 25,
		radiant: 0,
		slashing: 25,
	},
	skills: ["attack", "tenderise", "mighty_blow", "overpower"],
	stats: {
		charisma: 14,
		constitution: 20,
		dexterity: 12,
		intelligence: 10,
		strength: 22,
		wisdom: 14,
	},
	tactics: "default",
	naturalArmourClass: 18,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-NgJxsDuymhUWq2V4ew8",
		hand1: "-NgO1hZuxcjitw8l7yjz",
		head: "-NgJyJCDG-1UEccRymvT",
	},
});
