import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "munchling",
	name: "Munchling",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dLuxaOA1hXh3U7Mnv?alt=media&token=96b4d19f-9b3b-47ca-8f58-a654fea15e5f",
	rank: "normal",
	level: 11,
	threat: 11,
	attributes: {
		strength: 14,
		dexterity: 17,
		constitution: 14,
		intelligence: 6,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		maxHp: 87,
		armourClass: 13,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: ["cold"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackBonus: 7,
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "dexterity",
			},
		},
		skillIds: ["go_for_the_eyes", "cold_bite"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
