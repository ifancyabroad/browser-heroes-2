import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "guard_captain",
	name: "Guard Captain",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-KDRuLZZFywpQQzVs?alt=media&token=9e410478-e066-4f14-9d0c-5ead734171d5",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 10,
		dexterity: 16,
		constitution: 14,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDice: "12d8+40",
		armourClass: 10,
		proficiencyBonus: 4,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "take_aim",
				rank: 2,
			},
			{
				skillId: "multi_shot",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
