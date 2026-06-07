import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "chomper",
	name: "Chomper",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTNbCiHpz6PPDP3_Qm?alt=media&token=779abe20-411d-4a21-820f-7692aa8dfceb",
	rank: "normal",
	level: 7,
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
		maxHp: 45,
		armourClass: 6,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Bite",
			attackBonus: 5,
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "dexterity",
			},
		},
		skillIds: ["poison_bite", "growth"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
