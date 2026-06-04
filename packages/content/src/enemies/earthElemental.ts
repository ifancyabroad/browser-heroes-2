import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "earth_elemental",
	name: "Earth Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9R9WELrlP_t9usp1Q?alt=media&token=b107eb8c-6272-43d7-80d3-b6fa6b1ba0d8",
	boss: false,
	challenge: 17,
	zone: "tower",
	resistances: {
		acid: 25,
		cold: 25,
		crushing: 25,
		fire: 25,
		lightning: -50,
		necrotic: 0,
		piercing: 25,
		poison: 100,
		radiant: 0,
		slashing: 25,
	},
	skills: ["attack", "double_strike", "earthquake", "obliterate"],
	stats: {
		charisma: 5,
		constitution: 20,
		dexterity: 8,
		intelligence: 6,
		strength: 22,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 18,
	naturalMinDamage: 7,
	naturalMaxDamage: 14,
	naturalDamageType: "crushing",
});
