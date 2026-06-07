import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "worg",
	name: "Worg",
	description: "A wolf like creatue.",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NZMCIuuab0gVQ5bMj6j?alt=media&token=79233684-7c04-4e93-8ecb-d2c46fa45b07",
	rank: "normal",
	level: 7,
	threat: 7,
	attributes: {
		strength: 14,
		dexterity: 11,
		constitution: 11,
		intelligence: 7,
		wisdom: 11,
		charisma: 8,
	},
	combat: {
		maxHp: 45,
		armourClass: 8,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackBonus: 5,
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: [],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
