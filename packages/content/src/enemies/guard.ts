import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "guard",
	name: "Guard",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-HCKu2YgmZ2jK6vJM?alt=media&token=b2b4c1e6-b61b-4d69-b57d-a4da75e1b65a",
	rank: "normal",
	level: 9,
	threat: 9,
	attributes: {
		strength: 10,
		dexterity: 14,
		constitution: 12,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDice: "9d8+23",
		armourClass: 10,
		proficiencyBonus: 4,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["cripple", "take_aim"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
