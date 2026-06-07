import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "stitched_ogre",
	name: "Stitched Ogre",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NKt0FqDCM_Ms7YFjWhj?alt=media&token=3eadfc3b-9be7-46d3-ae83-2e76394cd478",
	rank: "normal",
	level: 16,
	threat: 16,
	attributes: {
		strength: 19,
		dexterity: 16,
		constitution: 16,
		intelligence: 3,
		wisdom: 6,
		charisma: 5,
	},
	combat: {
		maxHp: 138,
		armourClass: 14,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
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
		skillIds: ["flurry", "expose_weakness", "shadow_strike"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
