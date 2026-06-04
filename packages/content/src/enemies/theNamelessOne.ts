import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_nameless_one",
	name: "The Nameless One",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9QhTULKTqA4_qMU3E?alt=media&token=e08c09f2-dc55-4058-bf13-7c9badedfc7c",
	boss: true,
	challenge: 26,
	zone: "dungeon",
	resistances: {
		acid: 50,
		cold: 50,
		crushing: 50,
		fire: 50,
		lightning: 50,
		necrotic: 0,
		piercing: 50,
		poison: 50,
		radiant: 0,
		slashing: 50,
	},
	skills: ["attack", "tentacle_wrap", "multi_strike", "horrifying_visage", "tentacle_crush"],
	stats: {
		charisma: 6,
		constitution: 26,
		dexterity: 18,
		intelligence: 5,
		strength: 26,
		wisdom: 10,
	},
	tactics: "default",
	naturalArmourClass: 22,
	naturalMinDamage: 10,
	naturalMaxDamage: 16,
	naturalDamageType: "crushing",
});
