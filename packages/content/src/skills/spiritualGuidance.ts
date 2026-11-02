import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "spiritual_guidance",
	name: "Spiritual Guidance",
	description: "Increase your attack roll bonus and restore your HP over time.",
	icon: "skills/unique/spiritual_guidance.png",
	pool: "unique",
	kind: "prayer",
	category: "heal",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 10,
			duration: { unit: "turns", value: 6 },
		},
		{
			type: "healOverTime",
			target: "self",
			dice: "6d8",
			duration: { unit: "turns", value: 6 },
		},
	],
	tags: [],
});
