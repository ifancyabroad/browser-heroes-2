import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "cursed_guardian",
	name: "Cursed Guardian",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4gpGHT8virE-rpPW4?alt=media&token=4dcf99f3-4ca3-4f9d-9535-b32dd956908c",
	boss: false,
	challenge: 20,
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
	skills: ["attack", "obliterate", "devour_soul", "double_strike"],
	stats: {
		charisma: 13,
		constitution: 21,
		dexterity: 14,
		intelligence: 5,
		strength: 22,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 18,
	naturalMinDamage: 7,
	naturalMaxDamage: 14,
	naturalDamageType: "crushing",
});
