import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_shaman",
	name: "Ratman Shaman",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_V4rlMkRjOWIDQarx?alt=media&token=c97fd8ce-bd9c-4f2a-9778-aa3567bfb6d1",
	boss: false,
	challenge: 11,
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
	skills: ["attack", "cure_medium_wounds", "bless", "lighting_bolt"],
	stats: {
		charisma: 10,
		constitution: 14,
		dexterity: 16,
		intelligence: 14,
		strength: 10,
		wisdom: 14,
	},
	tactics: "default",
	naturalArmourClass: 12,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "slashing",
	equipment: {
		body: "-NMEwPxI9DXom0AaME0Z",
		hand1: "-NgK0TICJLv1vVaBGrbT",
	},
});
