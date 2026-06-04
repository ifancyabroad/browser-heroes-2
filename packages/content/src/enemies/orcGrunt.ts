import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_grunt",
	name: "Orc Grunt",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-gF7y0QsH82eTrh7n?alt=media&token=3b725386-b016-4347-bdfe-64f4f64d8b21",
	boss: false,
	challenge: 11,
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
	skills: ["attack", "battle_cry", "armour_break"],
	stats: {
		charisma: 10,
		constitution: 16,
		dexterity: 14,
		intelligence: 7,
		strength: 16,
		wisdom: 11,
	},
	tactics: "default",
	naturalArmourClass: 13,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-NgJzhkhaQDrg55F1iM1",
		hand1: "-NgK0TICJLv1vVaBGrbT",
	},
});
