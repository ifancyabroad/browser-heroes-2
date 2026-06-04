import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "aetheris_the_dawnflame",
	name: "Aetheris the Dawnflame",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OCK8vFseTxxM0LU2Ok7?alt=media&token=e0099aa3-ac12-46b8-95cd-9aaa4cf0a2ee",
	boss: true,
	challenge: 30,
	zone: "tower",
	resistances: {
		acid: 50,
		cold: 50,
		crushing: 50,
		fire: 50,
		lightning: 50,
		necrotic: 25,
		piercing: 50,
		poison: 50,
		radiant: 50,
		slashing: 50,
	},
	skills: [
		"attack",
		"dragon_focus",
		"multi_strike",
		"breath_of_the_dawnflame",
		"boon_of_the_dawnflame",
		"rebirth",
	],
	stats: {
		charisma: 28,
		constitution: 29,
		dexterity: 14,
		intelligence: 18,
		strength: 30,
		wisdom: 17,
	},
	tactics: "default",
	naturalArmourClass: 24,
	naturalMinDamage: 14,
	naturalMaxDamage: 28,
	naturalDamageType: "piercing",
});
