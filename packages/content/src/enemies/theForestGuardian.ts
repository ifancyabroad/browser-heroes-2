import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_forest_guardian",
	name: "The Forest Guardian",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkcIl5L0eB39i3HIeJ?alt=media&token=7d74ca0b-c140-4b1e-a79f-aa7b639d0b86",
	boss: true,
	challenge: 13,
	zone: "forest",
	resistances: {
		acid: 0,
		cold: -50,
		crushing: 25,
		fire: 100,
		lightning: 0,
		necrotic: 0,
		piercing: 25,
		poison: 100,
		radiant: 0,
		slashing: 25,
	},
	skills: ["attack", "double_strike", "focus_energy", "stoke_the_flames"],
	stats: {
		charisma: 7,
		constitution: 15,
		dexterity: 14,
		intelligence: 6,
		strength: 10,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 11,
	naturalMinDamage: 1,
	naturalMaxDamage: 8,
	naturalDamageType: "fire",
	equipment: {
		body: "-Nm2Cd-d46R6iuL4782x",
		hand2: "-NZMqz87pcH6a1OgycJ9",
	},
});
