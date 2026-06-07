import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "sharkman",
	name: "Sharkman",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dMUJn3WZ9o8aQlNnb?alt=media&token=f60c8ec6-02cc-4617-bff1-cdc8f210dd83",
	rank: "normal",
	level: 13,
	threat: 13,
	attributes: {
		strength: 16,
		dexterity: 15,
		constitution: 16,
		intelligence: 6,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		maxHp: 114,
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
			attackBonus: 8,
			damage: {
				dice: "1d8",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["charge", "detect_blood", "cold_bite", "rend"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
