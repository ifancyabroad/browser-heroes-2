import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "shrieker",
	name: "Shrieker",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTl1sgx8KyoiRbtpyg?alt=media&token=98536318-247f-4573-9955-b9e4219d9614",
	rank: "normal",
	level: 6,
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
		maxHp: 40,
		armourClass: 6,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackBonus: 4,
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["evasion", "deafening_screech"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
