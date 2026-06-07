import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_hellfire_catapult",
	name: "The Hellfire Catapult",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_bEIXK4OQRQ8b5pzp?alt=media&token=ea071f73-d09d-4c29-97ab-951f39a9a806",
	rank: "boss",
	level: 17,
	threat: 17,
	attributes: {
		strength: 20,
		dexterity: 14,
		constitution: 18,
		intelligence: 10,
		wisdom: 10,
		charisma: 5,
	},
	combat: {
		maxHp: 282,
		armourClass: 16,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 11,
			damage: {
				dice: "1d8+6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["disease_shot", "make_it_rain", "reposition"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
