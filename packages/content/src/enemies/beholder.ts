import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "beholder",
	name: "Beholder",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkXJrcYTG_XtKdj_B8?alt=media&token=34267405-ae1a-4b8d-a314-b9d0178207a4",
	boss: false,
	challenge: 18,
	zone: "volcano",
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
	skills: ["attack", "eye_ray"],
	stats: {
		charisma: 17,
		constitution: 18,
		dexterity: 14,
		intelligence: 17,
		strength: 10,
		wisdom: 15,
	},
	tactics: "caster",
	naturalArmourClass: 18,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "piercing",
});
