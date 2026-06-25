import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "chomper",
	name: "Chomper",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTNbCiHpz6PPDP3_Qm?alt=media&token=779abe20-411d-4a21-820f-7692aa8dfceb",
	rank: "normal",
	threat: 7,
	attributes: {
		strength: 12,
		dexterity: 14,
		constitution: 10,
		intelligence: 2,
		wisdom: 11,
		charisma: 4,
	},
	combat: {
		hitDice: "7d8+13",
		armourClass: 6,
		proficiencyBonus: 3,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "dexterity",
			},
		},
		skills: [
			{
				skillId: "poison_bite",
				rank: 1,
			},
			{
				skillId: "growth",
				rank: 1,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "strength"],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
