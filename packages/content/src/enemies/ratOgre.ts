import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "rat_ogre",
	name: "Rat Ogre",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_aLIP0OdTe0rGO9QY?alt=media&token=b126fffb-7453-47d4-9f1a-1459344c8036",
	rank: "normal",
	level: 14,
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
		maxHp: 136,
		armourClass: 13,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackBonus: 9,
			damage: {
				dice: "1d8",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["berserk", "heavy_strike"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
