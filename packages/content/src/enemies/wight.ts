import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wight",
	name: "Wight",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkWbFFsefw7IS2Vxk0?alt=media&token=ed7c16f1-fc4f-475f-85dd-55e16c3da147",
	boss: false,
	challenge: 15,
	zone: "hills",
	resistances: {
		acid: 0,
		cold: 0,
		crushing: 50,
		fire: 0,
		lightning: 0,
		necrotic: 50,
		piercing: 50,
		poison: 100,
		radiant: -50,
		slashing: 50,
	},
	skills: ["attack", "corrupting_touch", "evasion"],
	stats: {
		charisma: 15,
		constitution: 16,
		dexterity: 14,
		intelligence: 10,
		strength: 15,
		wisdom: 13,
	},
	tactics: "default",
	naturalArmourClass: 15,
	naturalMinDamage: 1,
	naturalMaxDamage: 6,
	naturalDamageType: "necrotic",
});
