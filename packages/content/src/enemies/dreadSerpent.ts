import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "dread_serpent",
	name: "Dread Serpent",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTmEuMs3XJu8TMDs9P?alt=media&token=25a7cb23-8592-4476-b64f-325c4f6aeb4d",
	boss: false,
	challenge: 15,
	zone: "hills",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: 0,
		fire: 0,
		lightning: 0,
		necrotic: 0,
		piercing: 0,
		poison: 100,
		radiant: -50,
		slashing: 0,
	},
	skills: ["attack", "toxic_bite", "acid_spray"],
	stats: {
		charisma: 6,
		constitution: 14,
		dexterity: 16,
		intelligence: 1,
		strength: 16,
		wisdom: 13,
	},
	tactics: "default",
	naturalArmourClass: 15,
	naturalMinDamage: 1,
	naturalMaxDamage: 8,
	naturalDamageType: "piercing",
});
