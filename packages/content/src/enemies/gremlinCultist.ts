import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "gremlin_cultist",
	name: "Gremlin Cultist",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9PwVr22rd-Chw1ykw?alt=media&token=1812558e-0bdc-49e0-8074-1ad8680833b4",
	boss: false,
	challenge: 14,
	zone: "dungeon",
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
	skills: ["attack", "curse", "chosen_by_the_nameless", "drain_life", "power_word_confusion"],
	stats: {
		charisma: 12,
		constitution: 12,
		dexterity: 14,
		intelligence: 10,
		strength: 8,
		wisdom: 16,
	},
	tactics: "caster",
	naturalArmourClass: 14,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		hand1: "-Nc46CPWJz2atC_uII9i",
	},
});
