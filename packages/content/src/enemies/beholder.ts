import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "beholder",
	name: "Beholder",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkXJrcYTG_XtKdj_B8?alt=media&token=34267405-ae1a-4b8d-a314-b9d0178207a4",
	rank: "normal",
	level: 18,
	threat: 18,
	attributes: {
		strength: 10,
		dexterity: 14,
		constitution: 18,
		intelligence: 17,
		wisdom: 15,
		charisma: 17,
	},
	combat: {
		hitDice: "18d8+91",
		armourClass: 18,
		proficiencyBonus: 6,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "dexterity",
			},
		},
		skillIds: ["eye_ray"],
		featIds: [],
		tactic: "caster",
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
