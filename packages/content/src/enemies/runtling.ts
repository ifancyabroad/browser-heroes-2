import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "runtling",
	name: "Runtling",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NKsyKI9WEI82s5dZFJ_?alt=media&token=45711dab-2627-4d69-9314-5ebe9d443818",
	rank: "normal",
	level: 4,
	threat: 4,
	attributes: {
		strength: 8,
		dexterity: 13,
		constitution: 9,
		intelligence: 10,
		wisdom: 8,
		charisma: 8,
	},
	combat: {
		hitDice: "4d8+8",
		armourClass: 7,
		proficiencyBonus: 2,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
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
		skillIds: ["charge", "acid_bite"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
