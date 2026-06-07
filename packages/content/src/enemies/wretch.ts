import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wretch",
	name: "Wretch",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC8uEK4XtBh_Py9ba4-?alt=media&token=07baeee7-7023-4e42-ac14-627dd5139d2e",
	rank: "normal",
	level: 10,
	threat: 10,
	attributes: {
		strength: 12,
		dexterity: 16,
		constitution: 12,
		intelligence: 6,
		wisdom: 12,
		charisma: 6,
	},
	combat: {
		maxHp: 70,
		armourClass: 14,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			name: "Claw",
			attackBonus: 7,
			damage: {
				dice: "1d6",
				type: "slashing",
				attribute: "dexterity",
			},
		},
		skillIds: ["evasion", "leap_attack"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
