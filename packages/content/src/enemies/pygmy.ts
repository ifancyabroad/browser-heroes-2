import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "pygmy",
	name: "Pygmy",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTZVlj1jll9-HF8fPh?alt=media&token=b633df2e-a7a4-4a31-a60d-b2e81fb622e3",
	rank: "normal",
	level: 5,
	threat: 5,
	attributes: {
		strength: 13,
		dexterity: 11,
		constitution: 10,
		intelligence: 6,
		wisdom: 10,
		charisma: 7,
	},
	combat: {
		hitDice: "5d8+12",
		armourClass: 6,
		proficiencyBonus: 3,
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
		skillIds: ["heavy_strike"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
