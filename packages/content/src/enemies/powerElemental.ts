import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "power_elemental",
	name: "Power Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9SlQ66CiMGqEk6_Mn?alt=media&token=47fb381e-08d2-45fa-8068-a25dda97b2ca",
	boss: false,
	challenge: 19,
	zone: "tower",
	resistances: {
		acid: 25,
		cold: -50,
		crushing: 25,
		fire: 25,
		lightning: 25,
		necrotic: 0,
		piercing: 25,
		poison: 100,
		radiant: 0,
		slashing: 25,
	},
	skills: ["attack", "double_strike", "overcharge", "obliterate"],
	stats: {
		charisma: 10,
		constitution: 20,
		dexterity: 10,
		intelligence: 8,
		strength: 22,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 18,
	naturalMinDamage: 7,
	naturalMaxDamage: 14,
	naturalDamageType: "crushing",
});
