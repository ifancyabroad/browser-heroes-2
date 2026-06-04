import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wizard",
	name: "Wizard",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-St-RJHnBQ5soLbo2?alt=media&token=73766717-d4b9-47a6-864e-7570896ec861",
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
	skills: ["attack", "armour", "sparks", "frost_arrow", "flame_arrow"],
	stats: {
		charisma: 10,
		constitution: 14,
		dexterity: 12,
		intelligence: 16,
		strength: 10,
		wisdom: 14,
	},
	tactics: "caster",
	naturalArmourClass: 10,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-NgO5fUaNmJH7LpPo2LP",
		hand1: "-Nc46CPWJz2atC_uII9i",
	},
});
