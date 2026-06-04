import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "nature_elemental",
	name: "Nature Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9S8vQ1mIwHqZ4JlBC?alt=media&token=c663ee31-ab03-453f-8cd0-97d15e750740",
	boss: false,
	challenge: 18,
	zone: "tower",
	resistances: {
		acid: 25,
		cold: 25,
		crushing: 25,
		fire: -50,
		lightning: 25,
		necrotic: 0,
		piercing: 25,
		poison: 100,
		radiant: 0,
		slashing: 25,
	},
	skills: ["attack", "nature_s_blessing", "poison_cloud"],
	stats: {
		charisma: 10,
		constitution: 20,
		dexterity: 14,
		intelligence: 8,
		strength: 18,
		wisdom: 12,
	},
	tactics: "default",
	naturalArmourClass: 16,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "poison",
});
