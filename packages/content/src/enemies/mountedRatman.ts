import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "mounted_ratman",
	name: "Mounted Ratman",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_elmg901ZBWKAxrfB?alt=media&token=8a2a0ee3-9f67-4fab-87ea-eb217820803e",
	rank: "normal",
	level: 12,
	threat: 12,
	attributes: {
		strength: 14,
		dexterity: 14,
		constitution: 18,
		intelligence: 8,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDice: "12d8+64",
		armourClass: 12,
		proficiencyBonus: 4,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Claw",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["charge", "armour_break"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
