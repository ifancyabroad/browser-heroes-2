import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wraith_lord_malakar",
	name: "Wraith Lord Malakar",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkYK7-G0lWSQ6VxFJy?alt=media&token=b67f50e4-ec95-44e3-b32d-b76baa23a53e",
	boss: true,
	challenge: 21,
	zone: "hills",
	resistances: {
		acid: 50,
		cold: 50,
		crushing: 50,
		fire: 50,
		lightning: 50,
		necrotic: 100,
		piercing: 50,
		poison: 100,
		radiant: -50,
		slashing: 50,
	},
	skills: ["attack", "corrupting_touch", "wail", "cloak_of_shadows"],
	stats: {
		charisma: 15,
		constitution: 16,
		dexterity: 16,
		intelligence: 12,
		strength: 6,
		wisdom: 14,
	},
	tactics: "caster",
	naturalArmourClass: 16,
	naturalMinDamage: 1,
	naturalMaxDamage: 8,
	naturalDamageType: "necrotic",
});
