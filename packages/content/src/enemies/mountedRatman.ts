import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "mounted_ratman",
	name: "Mounted Ratman",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_elmg901ZBWKAxrfB?alt=media&token=8a2a0ee3-9f67-4fab-87ea-eb217820803e",
	rank: "normal",
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
		hitDie: "1d8",
		armourClass: 12,
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
		skills: [
			{
				skillId: "charge",
				rank: 2,
			},
			{
				skillId: "armour_break",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution", "strength"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
