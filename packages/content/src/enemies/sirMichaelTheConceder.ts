import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "sir_michael_the_conceder",
	name: "Sir Michael the Conceder",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-aHa_lmK0ULBAQ4z3?alt=media&token=83dc0e92-a720-44e0-a04c-405badd818f2",
	boss: true,
	challenge: 14,
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
	skills: ["attack", "charge", "holy_strike", "thou_hast_bested_me"],
	stats: {
		charisma: 10,
		constitution: 18,
		dexterity: 16,
		intelligence: 10,
		strength: 18,
		wisdom: 16,
	},
	tactics: "concede",
	naturalArmourClass: 10,
	naturalMinDamage: 1,
	naturalMaxDamage: 4,
	naturalDamageType: "crushing",
	equipment: {
		body: "-NgJxsDuymhUWq2V4ew8",
		hand1: "-NgK0TICJLv1vVaBGrbT",
		head: "-NgJyJCDG-1UEccRymvT",
	},
});
