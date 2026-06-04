import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "grotesque",
	name: "Grotesque",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NKt-VrmU-I7ve15fvwC?alt=media&token=a6fea0d8-4d7a-4b4d-88e9-e61124c5bbf4",
	boss: false,
	challenge: 14,
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
	skills: ["attack", "into_the_grinder", "leap_attack"],
	stats: {
		charisma: 3,
		constitution: 16,
		dexterity: 10,
		intelligence: 2,
		strength: 18,
		wisdom: 6,
	},
	tactics: "default",
	naturalArmourClass: 14,
	naturalMinDamage: 4,
	naturalMaxDamage: 10,
	naturalDamageType: "piercing",
	equipment: {
		hand1: "-NgK0n7aPw0NHeefOnRg",
	},
});
