import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "shrieker",
	name: "Shrieker",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTl1sgx8KyoiRbtpyg?alt=media&token=98536318-247f-4573-9955-b9e4219d9614",
	rank: "normal",
	threat: 6,
	attributes: {
		strength: 12,
		dexterity: 10,
		constitution: 10,
		intelligence: 2,
		wisdom: 10,
		charisma: 5,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 6,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "deafening_screech",
				rank: 1,
			},
		],
		featIds: ["evasion"],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "dexterity"],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
