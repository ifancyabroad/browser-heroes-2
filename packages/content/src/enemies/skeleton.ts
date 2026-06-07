import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "skeleton",
	name: "Skeleton",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NKszEMMl4YFhX86psew?alt=media&token=31bf00b9-f9c9-4d51-84d5-a1cec41c5392",
	rank: "normal",
	level: 8,
	threat: 8,
	attributes: {
		strength: 10,
		dexterity: 13,
		constitution: 14,
		intelligence: 6,
		wisdom: 8,
		charisma: 5,
	},
	combat: {
		hitDice: "8d8+30",
		armourClass: 13,
		proficiencyBonus: 3,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["crushing", "radiant"],
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
		skillIds: [],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
