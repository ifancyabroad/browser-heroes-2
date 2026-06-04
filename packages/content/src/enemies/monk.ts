import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "monk",
	name: "Monk",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-LxGYypbHdVUhSGrE?alt=media&token=2310ff06-75eb-4c03-b754-e6f6527a219b",
	boss: false,
	challenge: 10,
	zone: "castle",
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
	skills: ["attack", "cure_minor_wounds", "holy_bolt", "power_word_shield"],
	stats: {
		charisma: 10,
		constitution: 14,
		dexterity: 12,
		intelligence: 10,
		strength: 10,
		wisdom: 16,
	},
	tactics: "caster",
	naturalArmourClass: 10,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-Nm2HibRx3V8P1isPlRf",
	},
});
