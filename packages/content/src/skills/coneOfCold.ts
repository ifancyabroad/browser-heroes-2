import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cone_of_cold",
	name: "Cone of Cold",
	description: "Emit a frigid blast, freezing enemies in a wide cone.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh5vG7znDT-6DBan2F?alt=media&token=4bfc216a-ef3b-4f89-a987-74741a2f1d2c",
	pool: "mage",
	category: "spell",
	maxUses: 4,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "cold",
					dice: "1d12+8",
					attribute: "intelligence",
					requiresAttackRoll: false,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "dexterity",
					operation: "add",
					value: -4,
					durationTurns: 4,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "cold",
					dice: "2d12+7",
					attribute: "intelligence",
					requiresAttackRoll: false,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "dexterity",
					operation: "add",
					value: -6,
					durationTurns: 5,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "cold",
					dice: "2d12+14",
					attribute: "intelligence",
					requiresAttackRoll: false,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "dexterity",
					operation: "add",
					value: -8,
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
