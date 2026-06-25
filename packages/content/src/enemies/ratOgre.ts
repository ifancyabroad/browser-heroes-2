import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "rat_ogre",
	name: "Rat Ogre",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_aLIP0OdTe0rGO9QY?alt=media&token=b126fffb-7453-47d4-9f1a-1459344c8036",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 18,
		dexterity: 14,
		constitution: 18,
		intelligence: 3,
		wisdom: 8,
		charisma: 6,
	},
	combat: {
		hitDice: "14d8+73",
		armourClass: 13,
		proficiencyBonus: 5,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "piercing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "berserk",
				rank: 2,
			},
			{
				skillId: "heavy_strike",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
