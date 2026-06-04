import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "berserker",
	name: "Berserker",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-GX-m_V2DTyU-_-ss?alt=media&token=99a36d53-e9a8-4511-a28c-76fe9530cd37",
	boss: false,
	challenge: 12,
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
	skills: ["attack", "armour_break", "berserk", "cleave"],
	stats: {
		charisma: 10,
		constitution: 14,
		dexterity: 12,
		intelligence: 10,
		strength: 16,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 10,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-Nm2AhkGYoZ3Qw0JaJfd",
		hand1: "-NgK-mAaFXHeapzVbWAb",
	},
});
