import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "necromental",
	name: "Necromental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9SIL6W0nRljBdyt11?alt=media&token=5dd8e3eb-aa6d-447d-9617-ed0acccbe512",
	boss: false,
	challenge: 17,
	zone: "tower",
	resistances: {
		acid: 25,
		cold: 25,
		crushing: -50,
		fire: 25,
		lightning: 25,
		necrotic: 0,
		piercing: 25,
		poison: 100,
		radiant: -50,
		slashing: 25,
	},
	skills: ["attack", "double_strike", "reassemble", "devour_soul"],
	stats: {
		charisma: 10,
		constitution: 18,
		dexterity: 14,
		intelligence: 8,
		strength: 20,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 17,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "slashing",
});
