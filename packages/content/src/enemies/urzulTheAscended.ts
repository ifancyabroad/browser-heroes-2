import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "urzul_the_ascended",
	name: "Urzul the Ascended",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-scXzx5GqPoZZcDX_?alt=media&token=2b04abb9-87ce-492a-89f9-ef0e87361574",
	boss: true,
	challenge: 19,
	zone: "plains",
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
	skills: [
		"attack",
		"cure_major_wounds",
		"flamestrike",
		"lighting_bolt",
		"blessing_of_the_old_gods",
	],
	stats: {
		charisma: 12,
		constitution: 18,
		dexterity: 12,
		intelligence: 18,
		strength: 14,
		wisdom: 18,
	},
	tactics: "caster",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-O8IBE_pHJnjHNYAUha-",
		hand1: "-OAsyMrMxiREAP6TWo4s",
	},
});
