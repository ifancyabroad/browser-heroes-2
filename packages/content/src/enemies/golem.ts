import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "golem",
	name: "Golem",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTqLUaOc0-qU_ug8Ly?alt=media&token=6f22be7b-9965-4091-abb4-725b0592f1ee",
	boss: false,
	challenge: 19,
	zone: "volcano",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: 50,
		fire: 0,
		lightning: 50,
		necrotic: 0,
		piercing: 50,
		poison: 100,
		radiant: 0,
		slashing: 50,
	},
	skills: ["attack", "knock_down", "reconstruct", "acquire_target", "double_strike"],
	stats: {
		charisma: 1,
		constitution: 20,
		dexterity: 9,
		intelligence: 3,
		strength: 22,
		wisdom: 11,
	},
	tactics: "default",
	naturalArmourClass: 19,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "crushing",
});
