import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "water_elemental",
	name: "Water Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9R4bc-LU3XAlwo921?alt=media&token=ec97df23-e33f-4e06-9aca-46dd9da7495b",
	boss: false,
	challenge: 17,
	zone: "tower",
	resistances: {
		acid: 25,
		cold: 25,
		crushing: 25,
		fire: 25,
		lightning: 25,
		necrotic: 0,
		piercing: 25,
		poison: 100,
		radiant: 0,
		slashing: 25,
	},
	skills: ["attack", "double_strike", "whelm"],
	stats: {
		charisma: 8,
		constitution: 18,
		dexterity: 16,
		intelligence: 5,
		strength: 20,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 15,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "crushing",
});
