import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "abyss_rider",
	name: "Abyss Rider",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4WTNNAtwspArSOQjX?alt=media&token=488c44be-c89e-4501-bd74-6e1f9132ea10",
	boss: false,
	challenge: 17,
	zone: "abyss",
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
	skills: ["attack", "armour_break", "deafening_roar", "leap_attack", "wind_strike"],
	stats: {
		charisma: 18,
		constitution: 16,
		dexterity: 16,
		intelligence: 12,
		strength: 18,
		wisdom: 14,
	},
	tactics: "default",
	naturalArmourClass: 16,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		hand1: "-NgO2xYEe4Kzg3ST0JW2",
	},
});
