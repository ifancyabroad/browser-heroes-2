import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "hell_guard",
	name: "Hell Guard",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9OdqzOPN2-Z14tnxO?alt=media&token=37d332a9-9861-4c88-85ca-6c9ff2a0796c",
	boss: false,
	challenge: 16,
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
	skills: ["attack", "multi_shot", "drop_from_above", "hunters_s_mark"],
	stats: {
		charisma: 14,
		constitution: 18,
		dexterity: 22,
		intelligence: 10,
		strength: 16,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 16,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		hand1: "-O838oF5XDaNy0Fs4Flp",
	},
});
