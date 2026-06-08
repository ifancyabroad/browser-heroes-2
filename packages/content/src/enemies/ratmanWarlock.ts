import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_warlock",
	name: "Ratman Warlock",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_YM1vo2Mdr-Q-wHc3?alt=media&token=ff71c971-06c5-44ea-a248-d741781dc108",
	rank: "normal",
	level: 13,
	threat: 13,
	attributes: {
		strength: 10,
		dexterity: 16,
		constitution: 14,
		intelligence: 18,
		wisdom: 16,
		charisma: 12,
	},
	combat: {
		hitDice: "13d8+42",
		armourClass: 12,
		proficiencyBonus: 5,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Claw",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d4",
				type: "slashing",
				attribute: "dexterity",
			},
		},
		skills: [
			{
				skillId: "embrace_shadows",
				rank: 2,
			},
			{
				skillId: "flame_arrow",
				rank: 2,
			},
			{
				skillId: "shadow_bolt",
				rank: 2,
			},
			{
				skillId: "blind",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "dexterity"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
