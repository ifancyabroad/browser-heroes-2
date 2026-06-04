import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "footman",
	name: "Footman",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-RxyAdleyrS9bRXq_?alt=media&token=b43a5b79-274b-4db9-9a18-6379051fefc4",
	boss: false,
	challenge: 11,
	zone: "castle",
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
	skills: ["attack", "heavy_strike", "armour_break"],
	stats: {
		charisma: 10,
		constitution: 14,
		dexterity: 14,
		intelligence: 10,
		strength: 14,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 10,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-Nm2B54qxLaMzsSjGgWO",
		hand1: "-NgK-mAaFXHeapzVbWAb",
		head: "-NgJyJCDG-1UEccRymvT",
	},
});
