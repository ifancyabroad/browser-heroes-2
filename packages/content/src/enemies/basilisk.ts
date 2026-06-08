import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "basilisk",
	name: "Basilisk",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTPWvUSrJHK-FcH_R1?alt=media&token=922dafba-7a03-44fe-99c6-68631296b765",
	rank: "normal",
	level: 11,
	threat: 11,
	attributes: {
		strength: 12,
		dexterity: 13,
		constitution: 11,
		intelligence: 2,
		wisdom: 10,
		charisma: 3,
	},
	combat: {
		hitDice: "11d8+15",
		armourClass: 11,
		proficiencyBonus: 4,
		damageAffinities: {
			resistances: ["fire"],
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
		skills: [
			{
				skillId: "petrifying_gaze",
				rank: 1,
			},
			{
				skillId: "leap_attack",
				rank: 1,
			},
			{
				skillId: "toxic_bite",
				rank: 1,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "strength"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
