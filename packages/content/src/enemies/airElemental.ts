import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "air_elemental",
	name: "Air Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9RF0Uh1Wq-FI2kBWZ?alt=media&token=7d2f484c-bf48-4e3f-9c1e-7911fee6bf0e",
	boss: false,
	challenge: 17,
	zone: "tower",
	resistances: {
		acid: 25,
		cold: 25,
		crushing: 25,
		fire: 25,
		lightning: 25,
		necrotic: 0,
		piercing: 25,
		poison: 100,
		radiant: 0,
		slashing: 25,
	},
	skills: ["attack", "double_strike", "cyclone"],
	stats: {
		charisma: 6,
		constitution: 16,
		dexterity: 22,
		intelligence: 8,
		strength: 18,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 16,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "lightning",
});
