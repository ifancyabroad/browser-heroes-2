import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "mounted_ratman",
	name: "Mounted Ratman",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_elmg901ZBWKAxrfB?alt=media&token=8a2a0ee3-9f67-4fab-87ea-eb217820803e",
	boss: false,
	challenge: 12,
	zone: "desert",
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
	skills: ["attack", "charge", "armour_break"],
	stats: {
		charisma: 6,
		constitution: 18,
		dexterity: 14,
		intelligence: 8,
		strength: 14,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 12,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "slashing",
	equipment: {
		body: "-NMEwPxI9DXom0AaME0Z",
		hand1: "-NgO2xYEe4Kzg3ST0JW2",
	},
});
