import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_champion",
	name: "Ratman Champion",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_WjPXKCDzDO9idJPs?alt=media&token=0ac491ce-0402-4a7c-b7ba-05758f70dc21",
	boss: false,
	challenge: 15,
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
	skills: ["attack", "shield_wall", "disarm", "rend"],
	stats: {
		charisma: 6,
		constitution: 14,
		dexterity: 16,
		intelligence: 10,
		strength: 16,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 12,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "slashing",
	equipment: {
		body: "-Nm2D2w4xiCJtkX_yQHG",
		hand1: "-NMmvhpTgBUrely_XRJ7",
		hand2: "-NZMqz87pcH6a1OgycJ9",
		head: "-NgJyJCDG-1UEccRymvT",
	},
});
